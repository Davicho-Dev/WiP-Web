import { StrictMode } from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Auth0ProviderWithConfig } from './providers'
import { Router } from './router'
import { store } from './store'

import 'react-toastify/dist/ReactToastify.css'
import './styles/globals.sass'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
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
	</StrictMode>
)
