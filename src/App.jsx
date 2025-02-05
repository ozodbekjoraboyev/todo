import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PencilEdit01Icon from "./assets/ikonkalar/Qalam";
import PlusSignIcon from "./assets/Qoshish.jsx";

function App() {
  const [todo, settTodo] = useState([]);
  const [inputQidirish, settinputQidirish] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      console.log(res.data.slice(0, 10));
      settTodo(res.data.slice(0, 10));
    });
  }, []);

  if (!todo) {
    return (
      <div className="m-auto flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredTodo = todo.filter((inputdaFiltr) => {
    return inputdaFiltr.title
      .toUpperCase()
      .includes(inputQidirish.toUpperCase());
  });

  return (
    <>
      <div className=" w-[900px] container text-center m-auto justify-center">
        <div className="flex gap-3 justify-center">
          <div className="flex items-center border-1 px-3 p-2 rounded">
            <input
              value={inputQidirish}
              onChange={(e) => {
                settinputQidirish(e.currentTarget.value);
              }}
              className="outline-none border-none rounded w-full p-1"
              type="text"
              placeholder=" Qidirish..."
            />
            <button className="bg-green-600 px-4 py-1 rounded text-white">
              Click
            </button>
          </div>
          <div className="flex items-center border-1 px-3 p-2 rounded">
            <input
              className="outline-none border-none rounded w-full p-1"
              type="text"
              placeholder=" Qoshish..."
            />
            <button className="bg-green-600 px-4 py-1 rounded">
              <PlusSignIcon />
            </button>
          </div>
          <button
            onClick={() => {
              settTodo([]);
            }}
            className="cursor-pointer bg-red-600 px-4 py-1 rounded text-white"
          >
            Delet
          </button>
          <button
            onClick={() => {}}
            className="cursor-pointer bg-blue-600 px-4 py-1 rounded text-white"
          >
            Mistake
          </button>
        </div>
        {filteredTodo.map((item, id) => {
          return (
            <div key={id}>
              <div className="flex items-center justify-between px-2 bg-blue-950 p-1 text-white rounded mt-2">
                <p className={` ${item.completed ? "line-through" : ""}`}>
                  {item.id}. {item.title}
                </p>
                <div className="flex items-center gap-4">
                  <p
                    className={`cursor-pointer`}
                    onClick={() => {
                      settTodo(
                        todo.map((ustigaChizish) => {
                          return ustigaChizish.id === item.id
                            ? {
                                ...ustigaChizish,
                                completed: !ustigaChizish.completed,
                              }
                            : ustigaChizish;
                        })
                      );
                    }}
                  >
                    ✔️
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      settTodo(
                        todo.filter((todoDelet) => {
                          return todoDelet.id !== item.id;
                        })
                      );
                    }}
                  >
                    ❌
                  </p>
                  <button
                    className="cursor-pointer bg-green-600 px-4 py-1 rounded text-white"
                    onClick={() => {
                      setEditingItem(item);
                      setModalOpen(true);
                    }}
                  >
                    <PencilEdit01Icon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && editingItem && (
        // <div
        //   onClick={() => {
        //     setModalOpen(false);
        //   }}
        //   className=" bg-blue-100 opacity-50 fixed inset-0 flex items-center justify-center left-0 right-0 "
        // >
        //   <div   onClick={(e) => e.stopPropagation()}  className="fixed inset-0 flex items-center justify-center left-0 right-0 opacity-100">
        //     <div className="bg-white p-6 rounded-lg">
        //       <h2 className="text-lg font-bold">Tahrirlash</h2>
        //       <input
        //         type="text"
        //         value={editingItem?.title || ""}
        //         onChange={(e) =>
        //           setEditingItem({ ...editingItem, title: e.target.value })
        //         }
        //         className="border p-2 w-full mt-2 rounded"
        //       />
        //       <div className="flex justify-end gap-2 mt-4">
        //         <button
        //           onClick={() => setModalOpen(false)}
        //           className="bg-gray-400 px-4 py-2 rounded"
        //         >
        //           Bekor qilish
        //         </button>
        //         <button
        //           onClick={() => {
        //             settTodo(
        //               todo.map((t) =>
        //                 t.id === editingItem.id ? editingItem : t
        //               )
        //             );
        //             setModalOpen(false);
        //           }}
        //           className="bg-blue-600 text-white px-4 py-2 rounded"
        //         >
        //           Saqlash
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div
          onClick={() => {
            setModalOpen(false);
          }}
          className="bg-blue-100  opacity-90 fixed inset-0 flex items-center justify-center left-0 right-0 "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg "
          >
            <h2 className="text-lg font-bold">Tahrirlash</h2>
            <input
              type="text"
              value={editingItem?.title || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, title: e.target.value })
              }
              className="border p-2 w-full mt-2 rounded"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  settTodo(
                    todo.map((t) => (t.id === editingItem.id ? editingItem : t))
                  );
                  setModalOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
