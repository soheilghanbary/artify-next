import {
  AiWebBrowsingIcon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
} from '@/components/icons/social'

type Props = {
  links: {
    instagram: string
    twitter: string
    github: string
    linkedin: string
    portfolio: string
  }
}

export const SocialLinks = ({ links }: Props) => {
  const socials = [
    {
      key: 'instagram',
      icon: <InstagramIcon className="size-5 text-[inherit]" />,
      url: links.instagram,
    },
    {
      key: 'twitter',
      icon: <NewTwitterIcon className="size-5 text-[inherit]" />,
      url: links.twitter,
    },
    {
      key: 'github',
      icon: <GithubIcon className="size-5 text-[inherit]" />,
      url: links.github,
    },
    {
      key: 'linkedin',
      icon: <Linkedin01Icon className="size-5 text-[inherit]" />,
      url: links.linkedin,
    },
    {
      key: 'portfolio',
      icon: <AiWebBrowsingIcon className="size-5 text-[inherit]" />,
      url: links.portfolio,
    },
  ]

  return (
    <div className="flex items-center gap-2">
      {socials.map(
        (social) =>
          social.url && (
            <a
              key={social.key}
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 transition-all hover:bg-muted"
              href={social.url}
            >
              {social.icon}
            </a>
          )
      )}
    </div>
  )
}
