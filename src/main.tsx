import { StrictMode } from 'react'

import ReactDOM from 'react-dom/client'
import axios from 'axios'

import { AuthProvider, ThemeProvider } from './context'
import Router from './router'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/globals.sass'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
// if (sessionStorage.getItem('TOKEN')) axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<Router />
				<ToastContainer
					closeOnClick={true}
					draggable={false}
					hideProgressBar={true}
					newestOnTop={true}
					pauseOnHover={false}
					position='bottom-right'
				/>
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>
)
