interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen max-w-md items-center justify-center m-auto">
      {children}
    </main>
  );
}
