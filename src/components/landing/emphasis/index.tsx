import Area from "../common/Area";
import Slogan from "./Slogan";
import principal from '../../../../public/principal.jpg'
import ImageResponsive from "../common/ImageResponsive";

export default function Emphasis () {
  return (
    <Area id="start" className="pt-20">
            <div className={`
                flex items-center justify-around
                h-[500px]
            `}>
                <Slogan />
                <ImageResponsive image={principal} className="rotate-3 hidden md:inline" />
            </div>
        </Area>
  )
}