import Link from 'next/link'

export default function Home() {

  return (<div>
            <h1>Uniplanner</h1>
        Click <Link href="/modules">here</Link> to get to all modules <br></br>
        Click <Link href="/plan">here</Link> to get to your plan
  </div>)
  ;
}
