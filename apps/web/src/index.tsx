import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import pagesRoutes from '~react-pages' // Auto-generated routes
import { StrictMode, Suspense } from 'react'
import UserDashboardLayout from 'components/layouts/user-dashboard'
import SimpleLayout from 'components/layouts/simple-layout'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

// Redefine Routers
const routes =pagesRoutes.map((route: any) => {
    const listOfPathsWithNavigationHeaders = ["/", "/incident"];
    const layout = listOfPathsWithNavigationHeaders
                        .some((path)=>path.includes(route.path)) ? <UserDashboardLayout /> : <SimpleLayout />;
    return {
        path: "/",
        element: layout,
        children: [route]
    }
});

function App() {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        {useRoutes(routes)}
      </Suspense>
    )
}
  
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
