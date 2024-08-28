// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie'; // For handling cookies on the client side
// import { checkCredentials} from '../../../utils/auth'

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const isAuthenticated = checkCredentials(username, password);

//     if (isAuthenticated) {
//       Cookies.set('auth', 'true', { expires: 1 }); // Set cookie for 1 day
//       router.push('/');
//     } else {
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  console.log('Middleware is running'); // Debugging log

  // Just let all requests go through
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Match all paths for testing
};

