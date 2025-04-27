export default function DashboardLayout(props: {
  children: React.ReactNode
  recommendations: React.ReactNode
}) {
    return (
           <div>
            {props.children}
            {props.recommendations}
           </div>      
    )
}