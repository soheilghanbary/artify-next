import { ModeToggle } from '@/components/common/mode-toggle'
import {
  AiWebBrowsingIcon,
  GithubIcon,
  NewTwitterIcon,
} from '@/components/icons/social'

export const Footer = () => {
  return (
    <footer className="mt-8 mb-14 border-t md:mb-0">
      <div className="container flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
        <p className="text-xs">
          Developed by{' '}
          <span className="font-medium text-primary underline decoration-wavy underline-offset-4">
            Soheil Ghanbary
          </span>
        </p>
        <div className="flex items-center gap-6">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/soheilghanbary"
          >
            <GithubIcon className="size-5 text-foreground" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://x.com/soheil_prog">
            <NewTwitterIcon className="size-5 text-foreground" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://soheilghanbary.ir/en"
          >
            <AiWebBrowsingIcon className="size-5 text-foreground" />
          </a>
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}
