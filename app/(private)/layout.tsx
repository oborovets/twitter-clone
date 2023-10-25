interface Props {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: Props) {
  return <main>{children}</main>;
}
