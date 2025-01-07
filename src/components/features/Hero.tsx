import { siteConfig } from '@/config/site'

export const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-12 md:py-24">
      <h1 className="motion-preset-fade-sm text-center font-black text-3xl/tight tracking-tight md:text-5xl/tight">
        {siteConfig.hero.title}
      </h1>
      <p className="motion-preset-fade-sm pt-1.5 text-center text-foreground/85 text-sm/6 lg:text-lg">
        {siteConfig.hero.description}
      </p>
    </div>
  )
}
