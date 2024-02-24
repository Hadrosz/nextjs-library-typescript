export default function UsersPage({ params }: { params: { userId: string } }) {
  return <h1>{params.userId}</h1>;
}
