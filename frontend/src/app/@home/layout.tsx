export default function HomeLayout(props: {
    children: React.ReactNode
    homeComponents: React.ReactNode
  }) {
      return (
             <div>
              {props.children}
              {props.homeComponents}
             </div>      
      )
  }