'use client'
import NotFoundAnimation from '@/assets/404.json'
import Lottie from 'lottie-react'

const NotFoundAnim = () => (
  <Lottie
    loop={true}
    autoPlay={true}
    className="mx-auto md:size-1/3"
    animationData={NotFoundAnimation}
  />
)

export default NotFoundAnim
