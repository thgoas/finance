import MenuUser from "./MenuUser";
import Welcome from "./Welcome";

export default function Header () {
  return (
    <div className={`
      flex justify-between items-center
      p-7 border-b border-zinc-900
    `}>
      <Welcome />
      <MenuUser />
    </div>
  )
}