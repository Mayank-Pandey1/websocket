const Input = ({placeholder, handleInput, name}: any) => {
  return (
    <div className='flex flex-col space-y-4 align-middle items-center'>
        <input className='h-10 text-center w-60 outline-none px-2 m-2 border-2' 
                name = {name}
                placeholder = {placeholder} 
                onChange = {handleInput} />
    </div>
  )
}

export default Input