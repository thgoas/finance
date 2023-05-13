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
} from 'firebase/firestore'
import { app } from '../config/app'

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
  async query(path: string, orderBy?: string, direction?: OrderByDirection): Promise<any[]> {
    const db = getFirestore(app)
    const collectionRef = collection(db, path)
    const filtro: QueryConstraint[] = []
    const ordination = orderBy ? [orderBy(orderBy, direction)] : []
    const consult = query(collectionRef, ...filtro, ...ordination)
    const result = await getDocs(consult)
    return result.docs.map(this._converterDoFirebase) ?? []
}

async queryById(path: string, id: string): Promise<any> {
    if (!id) return null
    const db = getFirestore(app)
    const docRef = doc(db, path, id)
    const result = await getDoc(docRef)
    return this._converterDoFirebase(result)
}

async queryWithFilters(path: string, filtros: Filtro[],
    orderBy?: string, direction?: OrderByDirection): Promise<any[]> {
    const db = getFirestore(app)
    const collectionRef = collection(db, path)

    const filtrosWhere = filtros?.map(f => where(f.atributo, f.op, f.valor)) ?? []
    const ordination = orderBy ? [orderBy(orderBy, direction)] : []

    const consult = query(collectionRef, ...filtrosWhere, ...ordination)
    const result = await getDocs(consult)
    return result.docs.map(this._converterDoFirebase) ?? []
}

private _converterDoFirebase(snapshot: DocumentSnapshot<DocumentData>) {
    if(!snapshot.exists()) return null
    const entidade: any = { ...snapshot.data(), id: snapshot.id }
    if (!entidade) return entidade
    return Object.keys(entidade).reduce((obj: any, atributo: string) => {
        const valor: any = entidade[atributo]
        return { ...obj, [atributo]: valor.toDate?.() ?? valor }
    }, {})
}
}
