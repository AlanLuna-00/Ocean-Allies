import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  //* Simplemente me lleva a la ruta /detail/id y en esa ruta se hace la peticion por el id de la URL
  const router = useRouter();

  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <input
        placeholder="ID del personaje"
        type="search"
        value={id}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          router.push(`/detail/${id}`);
          setId("");
        }}
      >
        Buscar
      </button>
    </div>
  );
}
