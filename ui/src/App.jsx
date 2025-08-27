
import './App.css'
import {useState} from "react";

function App() {
    const [items, setItems] = useState([]);
    function handleAddItems(item) {
        setItems([...items, item]);
    }

    function handleDeleteItem(id) {
        setItems(items.filter(item => item.id !== id));
    }

    function handlePackItem(id) {
        setItems(items.map(item =>
            item.id === id ? { ...item, packed: !item.packed } : item
        ));
    }

  return <div className={"app"}>
      <Logo/>
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItem} onPackItem={handlePackItem} />
      <Stats items={items}/>
  </div>
}

function Logo(){
    return <h1>🌴Far Away🌴</h1>
}

function Form({onAddItems}){

    const [description, setDescription] =useState("");
    const [quantity, setQuantity] =useState(1);
    function handleSubmit(e){
        e.preventDefault();
       if (!description) return alert(
            "Please enter a description"
       )

        const newItem = {description,quantity,packed:false,id:Date.now()};
        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return <form className={"add-form"} onSubmit={handleSubmit}>
        <h3>What you need for your trip?🤤</h3>
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </select>

        <input type={"text"} placeholder={"Description"}
               value={description}
               onChange={(e)=>setDescription(e.target.value)}/>
        <button>Add</button>
    </form>
}

function PackingList({items,onDeleteItems,onPackItem}){
    return (
    <div className={"list"}>
        <ul>
            {items.map(item=><Item onPackItem={onPackItem} onDeleteItem={onDeleteItems} key={item.id} item={item}/>)}
        </ul>
    </div>
    )
}

function Item({item,onDeleteItem,onPackItem}){
 return (
     <li>
         <input type={"checkbox"} checked={item.packed} onChange={() => onPackItem(item.id)}/>
         <span style={item.packed ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
             {item.quantity} {item.description}
         </span>
         <button onClick={()=>onDeleteItem(item.id)}>❌</button>
     </li>
 )
}

function Stats({items}){
    const totalItems = items.length;
    const totalPacked = items.filter(item => item.packed).length;
    return  (
        <footer className="stats">
            <em>
                {totalItems > 0
                    ? `You have ${totalItems} items on your list and you have ${totalPacked} items packed. ☺️`
                    : "Start packing"}
            </em>
        </footer>
    )
 }

export default App
