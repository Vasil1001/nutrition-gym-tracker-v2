interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
}

export default Container
