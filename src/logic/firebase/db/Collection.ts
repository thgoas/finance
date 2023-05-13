import Id from '@/logic/core/shared/Id'
import {
  OrderByDirection,
  QueryConstraint,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  orderBy,
  WhereFilterOp,
  where,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { app } from '../config/app'

export interface Filter {
  attribute: string
  op: WhereFilterOp
  value: any
}
export default class Collection {
  async save(path: string, entity: any, id?: string): Promise<any> {
    const db = getFirestore(app)
    const finalId = id ?? entity.id ?? Id.new()
    const docRef = doc(db, path, finalId)
    await setDoc(docRef, entity)

    return {
      ...entity,
      id: entity.id ?? finalId,
    }
  }

  async delete(path: string, id?: string): Promise<boolean> {
    if (!id) return false
    const db = getFirestore(app)
    const docRef = doc(db, path, id)
    const itemInTheBank = await getDoc(docRef)
    if (!itemInTheBank.exists()) return false
    await deleteDoc(docRef)
    return true
  }
  async query(
    path: string,
    myOrderBy?: string,
    direction?: OrderByDirection
  ): Promise<any[]> {
    const db = getFirestore(app)
    const collectionRef = collection(db, path)
    const filter: QueryConstraint[] = []
    const ordination = myOrderBy ? [orderBy(myOrderBy, direction)] : []
    const consult = query(collectionRef, ...filter, ...ordination)
    const result = await getDocs(consult)
    return result.docs.map(this._convertFromFirebase) ?? []
  }

  async queryById(path: string, id: string): Promise<any> {
    if (!id) return null
    const db = getFirestore(app)
    const docRef = doc(db, path, id)
    const result = await getDoc(docRef)
    return this._convertFromFirebase(result)
  }

  async queryWithFilters(
    path: string,
    filters: Filter[],
    myOrderBy?: string,
    direction?: OrderByDirection
  ): Promise<any[]> {
    const db = getFirestore(app)
    const collectionRef = collection(db, path)

    const filtrosWhere =
      filters?.map((f) => where(f.attribute, f.op, f.value)) ?? []
    const ordination = myOrderBy ? [orderBy(myOrderBy, direction)] : []

    const consult = query(collectionRef, ...filtrosWhere, ...ordination)
    const result = await getDocs(consult)
    return result.docs.map(this._convertFromFirebase) ?? []
  }

  private _convertFromFirebase(snapshot: DocumentSnapshot<DocumentData>) {
    if (!snapshot.exists()) return null
    const entity: any = { ...snapshot.data(), id: snapshot.id }
    if (!entity) return entity
    return Object.keys(entity).reduce((obj: any, atributo: string) => {
      const value: any = entity[atributo]
      return { ...obj, [atributo]: value.toDate?.() ?? value }
    }, {})
  }
}
