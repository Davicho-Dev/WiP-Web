import { StrictMode } from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import { Auth0ProviderWithConfig } from './providers'
import { Router } from './router'
import { store } from './store'

import 'react-toastify/dist/ReactToastify.css'
import './styles/globals.sass'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Auth0ProviderWithConfig>
					<Provider store={store}>
						<Router />
						<ToastContainer
							closeOnClick={true}
							draggable={false}
							hideProgressBar={true}
							newestOnTop={true}
							pauseOnHover={false}
							position='bottom-right'
						/>
					</Provider>
				</Auth0ProviderWithConfig>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
)
