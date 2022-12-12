# Education React Router (v6+)

## Table of Content

- [Instalasi](#instalasi)
- [Konfigurasi Router](#konfigurasi-router)
- [Navigasi](#navigasi)
- [Nested Routes](#nested-routes)
- [Route Params](#route-params)
- [Protected Routes](#protected-routes)
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

Sampai di sini kita sudah bisa membuka webnya dan memiliki 2 routing / endpoint, DENGAN BEBERAPA MASALAH:

- Bagaimanakah cara kita menggunakan NavBar yang ada untuk bisa berpindah ke halaman utama (`/`) dan halaman form (`/form-add`)? Apakah bisa menggunakan anchor href saja?
- Bagaimanakah caranya supaya baik pada `/` maupun `/form-add` sama sama memiliki `NavBar`? apakah perlu didefinisikan dua kali?

### Navigasi

### Nested Routes

### Route Params

### Protected Routes

### Referensi

- [React Router - Tutorial](https://reactrouter.com/en/main/start/tutorial)

```

```
