# Education React Router (v6+)

## Table of Content

- [Instalasi](#instalasi)
- [Konfigurasi Router](#konfigurasi-router)
- [Navigasi](#navigasi)
- [Nested Routes](#nested-routes)
- [Route Params](#route-params)
- [Protected Routes](#protected-routes)
- [Bonus](#bonus)
  - [NavLink](#navlink)
  - [Logic for Logout (Conditional Rendering)](#logic-for-logout-conditional-rendering)
- [Referensi](#referensi)

### Disclaimer

#### 1st Disclaimer

Kode pada pembelajaran ini dibuat dengan menggunakan `vite`. Apabila ingin menggunakan `create-react-app` harap bisa menyesuaikan yah !

#### 2nd Disclaimer

Untuk mengikuti pembelajaran ini, sudah disediakan sebuah template awal yang siap untuk diikuti yah, jadi kita tidak mencoba untuk membuat semua template dari awal pada pembelajaran ini !

### Instalasi

Cara untuk menggunakan `react-router` pada aplikasi React yang sudah dibuat (baik menggunakan `vite` ataupun `create-react-app` adalah dengan menggunakan perintah):

```sh
# npm
npm install react-router-dom
```

Setelah itu mari kita akan mencoba untuk mengkonfigurasikan `react-router-dom` supaya siap untuk menggunakan router pertama yang akan kita buat !

### Konfigurasi Router

Mari sekarang kita akan mencoba untuk mendefinisikan router yang akan dibuat yah !

Pada aplikasi yang akan kita buat, nantinya akan ada 4 rute utama yang akan dibuat:

- `/` untuk rute halaman utama yang berisi seluruh Card Photos
- `/:id` rute halaman detail yang berisi detail dari photos yang dipilih
- `/form-add` rute halaman penambahan photos
- `/login` rute untuk melakukan login

Adapun langkah untuk membuat router adalah sebagai berikut:

1. Membuat sebuah folder dengan nama `views` di dalam folder `src` (`src/views`)
1. Membuat sebuah file dengan nama `Home.jsx` di dalam folder `views` tersebut (`src/views/Home.jsx`)
1. Memindahkan seluruh kode yang ada di dalam `src/App.js(x)` ke dalam `src/views/Home.jsx` dan mengganti nama fungsinya menjadi `Home`.
1. Menghapus seluruh isi dari file `src/App.js(x)` dan mengubahnya menjadi sebagai berikut:

   ```js
   function App() {}

   export default App;
   ```

1. Membuat sebuah folder dengan nama `routes` di dalam folder `src` (`src/routes`)
1. Membuat sebuah file dengan nama `index.jsx` di dalam folder `routes` tersebut (`src/routes/index.jsx`)
1. Menuliskan kode untuk membuat router sebagai berikut:

   ```js
   // Import createBrowserRouter dari react-router-dom
   // ini berfungsi untuk membuat router

   // sebenarnya ada banyak tipe router (tidak hanya browser router saja)
   // tapi untuk web, kita akan menggunakan browser router
   import { createBrowserRouter } from "react-router-dom";

   // Import Component yang dibutuhkan
   import Home from "../views/Home";

   // mari kita membuat browser routernya di sini
   const router = createBrowserRouter([
     // definisikan routing yang dibutuhkan di sini
     {
       // Rute yang ingin ditambahkan
       path: "/",
       // Element / Component apa yang muncul ketika pengguna masuk ke rute ini?
       element: <Home />,
     },
   ]);

   export default router;
   ```

1. Memodifikasi kembali file `App.js(x)` untuk bisa menggunakan router yang sudah didefinisikan. Kodenya adalah sebagai berikut:

   ```js
   // import RouterProvider dari react-router-dom
   import { RouterProvider } from "react-router-dom";

   // import router dari src/routes/index.jsx
   import router from "./routes";

   function App() {
     return <RouterProvider router={router} />;
   }

   export default App;
   ```

1. Maka _voila_, kode kita pun kembali seperti semula, namun sudah bisa menggunakan `router`

Selanjutnya, mari kita coba untuk menambahkan routing yang baru untuk halaman Form pada endpoint `/photos-add`

Langkah untuk menambahkan routingnya adalah sebagai berikut:

1. Membuat sebuah file baru `src/views/FormAdd.jsx`
1. Memodifikasi kode pada `src/views/Home.jsx` dan menambahkan kode `src/views/FormAdd.jsx` menjadi sebagai berikut:

   ```js
   // File: src/views/Home.jsx

   import { useEffect, useState } from "react";

   function Home() {
     // ? Ini jadinya tidak digunakan lagi karena sudah menggunakan Router
     // card or form
     // const [currentPage, setCurrentPage] = useState("card");

     const [photos, setPhotos] = useState([]);
     const [detailPhotos, setDetailPhotos] = useState({});

     const fetchPhotos = async () => {
       try {
         const response = await fetch("http://localhost:3000/photos");
         const responseJson = await response.json();

         setPhotos(responseJson);
       } catch (err) {
         console.log(err);
       }
     };

     const cardPhotosAnchorOnClickHandler = async (event, id) => {
       event.preventDefault();

       try {
         const response = await fetch(`http://localhost:3000/photos/${id}`);
         const responseJson = await response.json();

         setDetailPhotos(responseJson);
       } catch (err) {
         console.log(err);
       }
     };

     const navigationOnClickHandler = (event, pageName) => {
       event.preventDefault();

       // ? Ini jadinya tidak digunakan lagi karena sudah menggunakan Router
       // setCurrentPage(pageName);
     };

     useEffect(() => {
       fetchPhotos();
     }, []);

     return (
       <div
         className="App"
         style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}
       >
         {/* NavBar */}
         <nav
           style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "space-between",
             alignItems: "center",
           }}
         >
           <div>
             <h1>Belajar Router</h1>
           </div>

           <ul
             style={{
               display: "flex",
               flexDirection: "row",
               gap: "1em",
               listStyleType: "none",
               padding: "0em",
             }}
           >
             <li>
               <a
                 href="#"
                 onClick={(evt) => navigationOnClickHandler(evt, "card")}
               >
                 Table JSONServer
               </a>
             </li>
             <li>
               <a
                 href="#"
                 onClick={(evt) => navigationOnClickHandler(evt, "form")}
               >
                 Form JSONServer
               </a>
             </li>
           </ul>
         </nav>

         {/* Detail Photos JSONServer */}
         {Object.keys(detailPhotos).length !== 0 && (
           <section>
             <h3>Section - Detail Photos</h3>

             <div>Id: {detailPhotos?.id}</div>
             <div>AlbumId: {detailPhotos?.albumId}</div>
             <div>Title: {detailPhotos?.title}</div>
             <div>URL: {detailPhotos?.url}</div>
             <div>Thumbnail URL: {detailPhotos?.thumbnailUrl}</div>
           </section>
         )}

         {/* List Photos JSONServer */}
         <section>
           <h3>Section - List of Photos</h3>

           <div
             style={{
               display: "flex",
               flexWrap: "wrap",
               gap: "1em",
               margin: "auto auto",
             }}
           >
             {photos.map((photo) => (
               <div key={photo.id}>
                 <img height={120} width={120} src={photo.url} />
                 <div style={{ textAlign: "center" }}>
                   <a
                     href="#"
                     onClick={(evt) =>
                       cardPhotosAnchorOnClickHandler(evt, photo.id)
                     }
                   >
                     Detail
                   </a>
                 </div>
               </div>
             ))}
           </div>
         </section>
       </div>
     );
   }

   export default Home;
   ```

   ```js
   // File: src/views/FormAdd.jsx

   import { useState } from "react";

   const FormAdd = () => {
     const [formInput, setFormInput] = useState({
       url: "",
       thumbnailUrl: "",
       title: "",
     });

     const resetFormInput = () => {
       setFormInput({
         url: "",
         thumbnailUrl: "",
         title: "",
       });
     };

     const formOnSubmitHandler = async (event) => {
       event.preventDefault();

       try {
         const dataToSend = {
           ...formInput,
           albumId: 3,
         };

         const response = await fetch(`http://localhost:3000/photos`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(dataToSend),
         });
         await response.json();

         resetFormInput();

         // ? Ini jadinya tidak digunakan lagi karena ada di tempat yang berbeda
         // await fetchPhotos();

         // ? Ini jadinya tidak digunakan lagi karena ada di tempat yang berbeda
         // setCurrentPage("card");
       } catch (err) {
         console.log(err);
       }
     };

     const formInputOnChangeHandler = (event) => {
       const newObj = {
         ...formInput,
       };

       newObj[event.target.name] = event.target.value;

       setFormInput(newObj);
     };

     return (
       // ? Di sini akan menambahkan style untuk sans-serif dan fontSize lagi
       <section style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}>
         <h3>Section - Form - Adding Photos</h3>

         <form
           onSubmit={formOnSubmitHandler}
           style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
         >
           <input
             type="text"
             name="title"
             placeholder="Insert Photo Title"
             style={{ padding: "1em 0.5em" }}
             value={formInput.title}
             onChange={formInputOnChangeHandler}
           />
           <input
             type="text"
             name="url"
             placeholder="Insert URL"
             style={{ padding: "1em 0.5em" }}
             value={formInput.url}
             onChange={formInputOnChangeHandler}
           />
           <input
             type="text"
             name="thumbnailUrl"
             placeholder="Insert Thumbnail URL"
             style={{ padding: "1em 0.5em" }}
             value={formInput.thumbnailUrl}
             onChange={formInputOnChangeHandler}
           />
           <button type="submit" style={{ padding: "1em 0.5em" }}>
             Add Photos
           </button>
         </form>
       </section>
     );
   };

   export default FormAdd;
   ```

1. Selanjutnya kita akan menambahkan routing pada file `src/routes/index.jsx` (untuk endpoint `/form-add`), modifikasi kodenya adalah sebagai berikut:

   ```js
   // Import createBrowserRouter dari react-router-dom
   // ini berfungsi untuk membuat router

   // sebenarnya ada banyak tipe router (tidak hanya browser router saja)
   // tapi untuk web, kita akan menggunakan browser router
   import { createBrowserRouter } from "react-router-dom";

   // Import Component yang dibutuhkan
   import Home from "../views/Home";
   import FormAdd from "../views/FormAdd";

   // mari kita membuat browser routernya di sini
   const router = createBrowserRouter([
     // definisikan routing yang dibutuhkan di sini
     {
       // Rute yang ingin ditambahkan
       path: "/",
       // Element / Component apa yang muncul ketika pengguna masuk ke rute ini?
       element: <Home />,
     },
     // Tambahan endpoint untuk form-add (FormAdd.jsx)
     {
       path: "/form-add",
       element: <FormAdd />,
     },
   ]);

   export default router;
   ```

1. Maka seharusnya ketika kita membuka web kita lagi, sudah bisa membuka `/` dan `/form-add` dengan baik.

Sampai di sini kita sudah bisa membuka webnya dan memiliki 2 routing / endpoint, DENGAN MASALAH BARU:

- **Bagaimanakah cara kita menggunakan NavBar yang ada untuk bisa berpindah ke halaman utama (`/`) dan halaman form (`/form-add`)? Apakah bisa menggunakan anchor href saja?**

### Navigasi

Untuk bisa menjawab permasalahan pertama yang ada, kita harus bisa mengerti bagaimana cara router bisa melakukan suatu hal yang bernama `Navigasi`. Navigasi di dalam `React Router` ini sendiri bisa menjadi 2 bagian besar:

- _Direct_ menggunakan `Link`
- _Programmatic_ menggunakan `useNavigate`

Pada pembelajaran ini kita akan mencoba untuk membahas keduanya yah !

Mari kita coba sekarang untuk menggunakan `Link` terlebih dahulu.

Langkah-langkahnya adalah sebagai berikut:

1. Membuat sebuah folder baru pada `src` dengan nama `components` (`src/components`)
1. Membuat sebuah file baru pada folder tersebut dengan nama `NavBar.jsx` (`/src/components/NavBar.jsx`)
1. Memindahkan fungsi `navigationOnClickHandler` dan section `{/* Navbar */}` dari `src/views/Home.jsx` ke `src/components/NavBar.jsx` sehingga kodenya menjadi seperti berikut:

   ```js
   // File: src/components/NavBar.jsx
   const NavBar = () => {
     const navigationOnClickHandler = (event, pageName) => {
       event.preventDefault();

       // ? Ini jadinya tidak digunakan lagi karena sudah menggunakan Router
       // setCurrentPage(pageName);
     };

     return (
       <nav
         style={{
           display: "flex",
           flexDirection: "row",
           justifyContent: "space-between",
           alignItems: "center",
         }}
       >
         <div>
           <h1>Belajar Router</h1>
         </div>

         <ul
           style={{
             display: "flex",
             flexDirection: "row",
             gap: "1em",
             listStyleType: "none",
             padding: "0em",
           }}
         >
           <li>
             <a
               href="#"
               onClick={(evt) => navigationOnClickHandler(evt, "card")}
             >
               Table JSONServer
             </a>
           </li>
           <li>
             <a
               href="#"
               onClick={(evt) => navigationOnClickHandler(evt, "form")}
             >
               Form JSONServer
             </a>
           </li>
         </ul>
       </nav>
     );
   };

   export default NavBar;
   ```

1. Mengimport component NavBar pada `src/views/Home.jsx` dan panggil pada JSX yang ada.

   ```js
   // File: src/views/Home.jsx

   ...
   // ? Import NavBar dari components
   import NavBar from "../components/NavBar";

   function Home() {
     ...

     return (
       ...

       {/* NavBar */}
       {/* ? Gunakan NavBar di sini */}
       <NavBar />

       ...
     )
   }
   ```

1. Memodifikasi kembali file `src/components/NavBar.jsx` untuk menggunakan `Link`

   ```js
   // ? import Link dari react-router-dom
   import { Link } from "react-router-dom";

   const NavBar = () => {
     const navigationOnClickHandler = (event, pageName) => {
       event.preventDefault();

       // ? Ini jadinya tidak digunakan lagi karena sudah menggunakan Router
       // setCurrentPage(pageName);
     };

     return (
       <nav
         style={{
           display: "flex",
           flexDirection: "row",
           justifyContent: "space-between",
           alignItems: "center",
         }}
       >
         <div>
           <h1>Belajar Router</h1>
         </div>

         <ul
           style={{
             display: "flex",
             flexDirection: "row",
             gap: "1em",
             listStyleType: "none",
             padding: "0em",
           }}
         >
           <li>
             <a
               href="#"
               onClick={(evt) => navigationOnClickHandler(evt, "card")}
             >
               Table JSONServer
             </a>
           </li>
           <li>
             {/* Ganti a href menjadi Link */}
             {/* <a href="#" onClick={(evt) => navigationOnClickHandler(evt, "form")}>
               Form JSONServer
             </a> */}
             <Link to="/form-add">Form JSONServer</Link>
           </li>
         </ul>
       </nav>
     );
   };

   export default NavBar;
   ```

1. Dan _voila_ ketika kita membuka kembali halaman utama yang sudah dibuat (`/`), `NavBar` sudah bisa ditekan dan pindah ke halaman `/form-add` !

Selanjutnya bagaimana bila kita akan menggunakan `FormAdd` dengan sebaik-baiknya?

Bagaimana caranya supaya bisa berpindah setelah `FormAdd` telah melakukan event submitnya?

Solusinya adalah menggunakan `programmatic navigation`.

Langkah-langkah untuk melakukan `programmatic navigation` pada `React Router` dengan menggunakan sesuatu yang bernama `useNavigate` adalah sebagai berikut:

1. Membuka kembali file `src/views/FormAdd.jsx` dan memodifikasi kodenya untuk menggunakan `useNavigate`. Adapun kodenya adalah sebagai berikut:

   ```js
   import { useState } from "react";
   // ? Import useNavigate dari react-router-dom
   import { useNavigate } from "react-router-dom";

   const FormAdd = () => {
     // ? Panggil useNavigate dengan nama navigate
     const navigate = useNavigate();

     ...

     const formOnSubmitHandler = async (event) => {
       event.preventDefault();

       try {
         const dataToSend = {
           ...formInput,
           albumId: 3,
         };

         const response = await fetch(`http://localhost:3000/photos`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(dataToSend),
         });
         await response.json();

         resetFormInput();

         // ? Ini jadinya tidak digunakan lagi karena ada di tempat yang berbeda
         // await fetchPhotos();

         // ? Ini jadinya tidak digunakan lagi karena ada di tempat yang berbeda
         // setCurrentPage("card");

         // ? Gunakan navigate untuk berpindah ke halaman `/`
         // ! Kita tidak perlu menggunakan fetchPhotos lagi, karena
         // ! Ketika berpindah ke halaman `/` maka data akan di-fetch kembali
         // ! (re-render)
         navigate("/");
       } catch (err) {
         console.log(err);
       }
     };

     ...
   ```

1. Dan _voila_ ! Setelah melakukan form submission pada endpoint `/form-add` maka secara otomatis akan berpindah ke halaman `/` dan data akan di load ulang kembali !

Nah setelah ini mari kita melihat suatu permasalahan yang baru lagi yah:

- **Bagaimanakah caranya supaya baik pada `/` maupun `/form-add` sama sama memiliki `NavBar`? apakah perlu didefinisikan dua kali?**

### Nested Routes

Untuk menjawab pertanyaan di atas, kita harus mengetahui terlebih dahulu apa yang dimaksud dengan `slot-ting` atau membuat `nested routes` (mirip dengan `partials` pada ejs dan `vue router`).

Hal ini dapat dicapai dengan menggunakan suatu hal yang bernama `Outlet` yang dimiliki oleh `React Router`.

Untuk dokumentasi `Outlet` dapat dibaca [di sini](https://reactrouter.com/en/main/components/outlet)

Setelah membaca dokumentasi ini, maka sekarang idenya adalah:

- **Bagaimana caranya membuat sebuah `Layout` yang bisa menerima sebuah component NavBar dan bisa menerima View yang dinamis berdasarkan routing yang ada?**

Langkah untuk mensolusikan hal ini adalah sebagai berikut:

1. Membuat sebuah folder dengan nama `layouts` pada folder `src` (`src/layouts`)
1. Membuat sebuah file dengan nama `BaseLayout.jsx` pada folder `layouts` (`/src/layouts/BaseLayout.jsx`)
1. Menuliskan kode sebagai berikut pada `BaseLayout.jsx`

   ```js
   // Import outlet dari react-router-dom
   import { Outlet } from "react-router-dom";

   // Import NavBar di sini
   import NavBar from "../components/NavBar";

   const BaseLayout = () => {
     return (
       // ? Ingat harus Single Root sehingga harus menggunakan Fragment
       <>
         {/* Gunakan NavBar di sini */}
         <NavBar />
         {/* Gunakan Outlet di sini */}
         <Outlet />
       </>
     );
   };

   export default BaseLayout;
   ```

1. Memodifikasi router (`/src/routes/index.jsx`) untuk bisa menggunakan BaseLayout ini. Adapun kodenya adalah sebagai berikut:

   ```js
   ...

   // ? Import BaseLayout di sini
   import BaseLayout from "../layouts/BaseLayout";

   // mari kita membuat browser routernya di sini
   const router = createBrowserRouter([
     // ? Kita akan mencoba untuk menggunakan Layout di sini
     // ? Bungkus yang awalnya array ini menjadi sebuah object
     {
       // ? Tambahkan element di sini untuk menggunakan BaseLayout
       element: <BaseLayout />,
       // ? Gunakan routesnya jadi di sini dengan dibungkus "children"
       children: [
         // definisikan routing yang dibutuhkan di sini
         {
           // Rute yang ingin ditambahkan
           path: "/",
           // Element / Component apa yang muncul ketika pengguna masuk ke rute ini?
           element: <Home />,
         },
         // Tambahan endpoint untuk form-add (FormAdd.jsx)
         {
           path: "/form-add",
           element: <FormAdd />,
         },
       ],
     },
   ]);

   ...
   ```

1. Memodifikasi Kode pada `src/views/Home.jsx` untuk tidak menggunakan `NavBar` lagi (import NavBar dan penggunakan <NavBar /> dihapus)
1. Dan _voila_ ! Sekarang kita sudah bisa membuat `BaseLayout` yang bisa menerima `NavBar` dan juga bisa menerima `Outlet` yang dinamis berdasarkan routing yang ada.

Sekarang mari kita juga menambahkan routing untuk memisahkan antara halaman "detail" dari photo dan halaman "card" dari photo.

Sebenarnya hal ini bisa bisa saja kita lakukan dengan membuat suatu children di dalam path `/` yang ada. Tapi permasalahan selanjutnya adalah:

**- Bagaimanakah cara kita untuk bisa menghandle `kedinamisan` data yang ada pada halaman `detail` tersebut?**

### Route Params

Untuk bisa menjawab pertanyaan di atas, kita harus mengetahui mengenai cara penggunaan `Route Params` pada `React Router` dan bagaimana cara untuk membacanya dengan menggunakan `useParams`.

Dokumentasi:

- [`Route Params`](https://reactrouter.com/en/main/routers/create-browser-router#routes)
- [`useParams`](https://reactrouter.com/en/main/hooks/use-params)

Nah setelah membaca dokumentasi ini, maka idenya untuk menyelesaikan masalah di atas adalah:

- Memisahkan halaman `Detail` dari `Home`
- Membuat sebuah path baru dengan nama `/:id` pada `routes/index.jsx`
- Menambahkan `Outlet` pada Component `Home` untuk bisa menerima halaman `Detail`
- Menggunakan `useParams` pada halaman `Detail` untuk bisa menerima kedinamisan data yang ada pada halaman `Detail`

Langkah untuk mensolusikan hal ini adalah sebagai berikut:

1. Memodifikasi halaman `views/Home.jsx` dan menuliskan kode sebagai berikut:

   ```js
   import { useEffect, useState } from "react";
   // ? Import Outlet dan useNavigate dari react-router-dom
   import { Outlet, useNavigate } from "react-router-dom";

   function Home() {
     const [photos, setPhotos] = useState([]);
     const navigate = useNavigate();

     const fetchPhotos = async () => {
       try {
         const response = await fetch("http://localhost:3000/photos");
         const responseJson = await response.json();

         setPhotos(responseJson);
       } catch (err) {
         console.log(err);
       }
     };

     const cardPhotosAnchorOnClickHandler = async (event, id) => {
       event.preventDefault();

       // Gunakan navigate di sini
       navigate(`/${id}`);
     };

     useEffect(() => {
       fetchPhotos();
     }, []);

     return (
       <div
         className="App"
         style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}
       >
         {/* Gunakan Outlet di sini */}
         <Outlet />

         {/* List Photos JSONServer */}
         <section>
           <h3>Section - List of Photos</h3>

           <div
             style={{
               display: "flex",
               flexWrap: "wrap",
               gap: "1em",
               margin: "auto auto",
             }}
           >
             {photos.map((photo) => (
               <div key={photo.id}>
                 <img height={120} width={120} src={photo.url} />
                 <div style={{ textAlign: "center" }}>
                   <a
                     href="#"
                     onClick={(evt) =>
                       cardPhotosAnchorOnClickHandler(evt, photo.id)
                     }
                   >
                     Detail
                   </a>
                 </div>
               </div>
             ))}
           </div>
         </section>
       </div>
     );
   }

   export default Home;
   ```

1. Membuat sebuah page baru dengan nama `views/Detail.jsx` dan menuliskan kode sebagai berikut:

   ```js
   import { useEffect, useState } from "react";
   // ? Di sini kita harus menggunakan useParams
   import { useParams } from "react-router-dom";

   const Detail = () => {
     // ? Di sini kita harus menggunakan useParams
     // ? Ingat tadi kita menuliskan pada pathnya adalah :id
     const { id } = useParams();

     const [detailPhotos, setDetailPhotos] = useState({});

     const fetchPhotoDetail = async (id) => {
       try {
         const response = await fetch(`http://localhost:3000/photos/${id}`);
         const responseJson = await response.json();

         setDetailPhotos(responseJson);
       } catch (err) {
         console.log(err);
       }
     };

     // ? Di sini kita panggilnya dengan menggunakan useEffect
     useEffect(
       // Effect
       () => {
         fetchPhotoDetail(id);
       },
       // Jangan lupa Deps Listnya, karena akan kita panggil lagi ketika
       // Params berubah
       [id]
     );

     return (
       <>
         {Object.keys(detailPhotos).length !== 0 && (
           <section>
             <h3>Section - Detail Photos</h3>

             <div>Id: {detailPhotos?.id}</div>
             <div>AlbumId: {detailPhotos?.albumId}</div>
             <div>Title: {detailPhotos?.title}</div>
             <div>URL: {detailPhotos?.url}</div>
             <div>Thumbnail URL: {detailPhotos?.thumbnailUrl}</div>
           </section>
         )}
       </>
     );
   };

   export default Detail;
   ```

1. Selanjutnya kita akan mendefinisikan endpoint / route tambahan pada `src/routes/index.js`

   ```js
   // Import createBrowserRouter dari react-router-dom
   // ini berfungsi untuk membuat router

   // sebenarnya ada banyak tipe router (tidak hanya browser router saja)
   // tapi untuk web, kita akan menggunakan browser router
   import { createBrowserRouter } from "react-router-dom";

   // Import Component yang dibutuhkan
   import Home from "../views/Home";
   import FormAdd from "../views/FormAdd";
   // ? Import Detail
   import Detail from "../views/Detail";

   // ? Import BaseLayout di sini
   import BaseLayout from "../layouts/BaseLayout";

   // mari kita membuat browser routernya di sini
   const router = createBrowserRouter([
     // ? Kita akan mencoba untuk menggunakan Layout di sini
     // ? Bungkus yang awalnya array ini menjadi sebuah object
     {
       // ? Tambahkan element di sini untuk menggunakan BaseLayout
       element: <BaseLayout />,
       // ? Gunakan routesnya jadi di sini dengan dibungkus "children"
       children: [
         // definisikan routing yang dibutuhkan di sini
         {
           // Rute yang ingin ditambahkan
           path: "/",
           // Element / Component apa yang muncul ketika pengguna masuk ke rute ini?
           element: <Home />,
           children: [
             // ? Tambahkan path detail di sini
             // ? Perhatikan di sini kita tidak menggunakan absolute path
             // ? Tidak ada `/` di depannya
             {
               path: ":id",
               element: <Detail />,
             },
           ],
         },
         // Tambahan endpoint untuk form-add (FormAdd.jsx)
         {
           path: "/form-add",
           element: <FormAdd />,
         },
       ],
     },
   ]);

   export default router;
   ```

1. Dan _voila_, sampai pada titik ini seharusnya kita sudah berhasil untuk membuat Halaman Home dan Detail yang "terpisah" !

Nah sekarang mari kita masuk ke permasalahan selanjutnya yah:

- **Bagaimana caranya apabila kita memiliki suatu halaman yang hanya bisa diakses oleh user yang sudah login?**

### Protected Routes

Nah untuk bisa menyelesaikan permasalahan di atas, kita harus mengerti terlebih dahulu konsep yang bernama `Protected Routes` pada `React Router`.

`Protected Routes` artinya adalah kita menggunakan suatu cara untuk bisa memproteksi route yang kita buat agar hanya bisa diakses apabila logic untuk memproteksi route tersebut terpenuhi.

Pada `React Router` (v6.4+) untuk bisa melakukan hal tersebut bisa dilakukan dengan menggunakan 2 hal:

- [Loader](https://reactrouter.com/en/main/route/loader)
- [redirect](https://reactrouter.com/en/main/fetch/redirect)

Nah setelah melihat dokumentasinya, maka idenya sekarang ini adalah:

- Membuat sebuah halaman untuk bisa melakukan login
- Menambahkan logic untuk `Loader` dan `redirect` pada halaman yang ingin kita proteksi

Langkah untuk mensolusikan hal ini adalah:

1. Membuat sebuah file baru dengan nama `src/views/Login.jsx` dan menuliskan kode sederhana untuk melakukan login

   ```js
   import { useNavigate } from "react-router-dom";

   const Login = () => {
     const navigate = useNavigate();

     const buttonOnClickHandler = () => {
       // Ini hanyalah simulasi login
       // In real case mungkin akan menggunakan fetch untuk melakukan login
       localStorage.setItem("token", "12345");
       navigate("/");
     };

     return (
       <div>
         <h1>Login</h1>
         <button onClick={buttonOnClickHandler}>Login</button>
       </div>
     );
   };

   export default Login;
   ```

1. Mendeklarasikan route Login pada file `src/routes/index.js` serta menambahkan logic untuk `Loader` dan `redirect` pada halaman yang ingin diproteksi

   ```js
   // Import createBrowserRouter dari react-router-dom
   // ini berfungsi untuk membuat router

   // sebenarnya ada banyak tipe router (tidak hanya browser router saja)
   // tapi untuk web, kita akan menggunakan browser router
   import { createBrowserRouter } from "react-router-dom";
   // ? Import redirect dari react-router-dom
   import { redirect } from "react-router-dom";

   // Import Component yang dibutuhkan
   import Home from "../views/Home";
   import FormAdd from "../views/FormAdd";
   // ? Import Detail
   import Detail from "../views/Detail";
   // ? Import Login
   import Login from "../views/Login";

   // ? Import BaseLayout di sini
   import BaseLayout from "../layouts/BaseLayout";

   // mari kita membuat browser routernya di sini
   const router = createBrowserRouter([
     // ? Kita akan mencoba untuk menggunakan Layout di sini
     // ? Bungkus yang awalnya array ini menjadi sebuah object
     {
       // ? Tambahkan element di sini untuk menggunakan BaseLayout
       element: <BaseLayout />,
       // ? Ceritanya untuk setiap route yang ada di bawah ini
       // ? Akan kita proteksi
       // ? Jika tidak ada token, maka akan di redirect ke halaman login
       loader: () => {
         // ? Cek apakah ada token di localStorage
         const token = localStorage.getItem("token");
         // ? Jika tidak ada, maka redirect ke halaman login
         if (!token) {
           return redirect("/login");
         }

         // ? Harus ada sesuatu yang direturn pada loader
         // ? sehingga kita return null saja cukup
         return null;
       },
       // ? Gunakan routesnya jadi di sini dengan dibungkus "children"
       children: [
         // definisikan routing yang dibutuhkan di sini
         {
           // Rute yang ingin ditambahkan
           path: "/",
           // Element / Component apa yang muncul ketika pengguna masuk ke rute ini?
           element: <Home />,
           children: [
             // ? Tambahkan path detail di sini
             // ? Perhatikan di sini kita tidak menggunakan absolute path
             // ? Tidak ada `/` di depannya
             {
               path: ":id",
               element: <Detail />,
             },
           ],
         },
         // Tambahan endpoint untuk form-add (FormAdd.jsx)
         {
           path: "/form-add",
           element: <FormAdd />,
         },
       ],
     },
     // ? Tambahkan route baru untuk melakukan login di sini
     {
       path: "/login",
       element: <Login />,
     },
   ]);

   export default router;
   ```

### Bonus

Bonus ini hanya berisi tambahan untuk membuat kode kita menjadi lebih berwarna dan terproteksi yah !

Mari kita coba lihat beberapa hal: `NavLink` dan `Logic for Logout`

#### NavLink

Untuk membuat navigasi yang lebih "berwarna", pada `React Router` ini selain disediakan `Link` juga disediakan `NavLink`. `NavLink` ini memiliki beberapa props tambahan yang bisa kita gunakan untuk membuat navigasi yang lebih "berwarna" ketika sedang aktif.

Dokumentasi untuk [`NavLink`](https://reactrouter.com/en/main/components/nav-link).

#### Logic for Logout (Conditional Rendering)

Nah dengan memanfaatkan `Loader` pada yang sebelumnya, kita bisa membuat protected routes yang ada. Kemudian pada halaman utama yang ada, bagaimana caranya kah kita memilah antara orang ini sedang Login ataupun sedang Logout ?

Maka caranya adalah dengan menggunakan `Conditional Rendering` berdasarkan token yang disimpan di dalam `localStorage`.

```js
// Logic untuk mengecek apakah sedang login atau tidak
const isLogin = Boolean(localStorage.getItem("token"));
```

Dan Selesai untuk semuanya !

Panjang sekali yah, tapi semoga bermanfaat !

### Referensi

- [React Router - Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [React Router - Outlet](https://reactrouter.com/en/main/components/outlet)
