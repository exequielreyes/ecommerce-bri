import { UserButton } from "@clerk/nextjs";

function DashboardPage() {
  return (
    <div>
        <h1>
            DashboardPage            
        </h1>
        <UserButton  
        //  afterSignOutUrl="/sign-in"
        
        />

    </div>
  )
}

export default DashboardPage