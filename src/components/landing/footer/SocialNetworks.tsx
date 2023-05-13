import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react"

import SocialNetwork from "./SocialNetwork"

export default function SocialNetworks() {
    return (
        <div className="flex">
            <SocialNetwork ico={<IconBrandYoutube />} url="https://www.youtube.com/@cod3r" />
            <SocialNetwork ico={<IconBrandInstagram />} url="https://www.instagram.com/cod3rcursos" />
            <SocialNetwork ico={<IconBrandFacebook />} url="https://www.facebook.com/cod3rcursos/" />
            <SocialNetwork ico={<IconBrandGithub />} url="https://github.com/cod3rcursos" />
        </div>
    )
}