import Link from 'next/link'

type Props = {
  label: string
  href: string
  icon: any
}

export const NavLink = ({ label, href, icon: Icon }: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-4 py-2 text-foreground/85 text-sm transition-all hover:text-foreground"
    >
      <Icon className="size-5" />
      {label}
    </Link>
  )
}
