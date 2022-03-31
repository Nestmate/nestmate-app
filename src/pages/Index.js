export const Index = () => {
  
  return (
    <div className="container px-3 mx-auto md:px-4">
      <div className="w-full lg:w-2/3 mx-auto">
        <div className="text-center">
            <h1 className="text-5xl md:text-7xl">Find your perfect roommate.</h1>
            <p className="text-2xl my-4">We're not fully launched yet 😢. But feel free to request an early beta invite.</p>
            <form>
            <fieldset className="grid grid-cols-3 gap-3 w-full md:w-2/3 mx-auto">
              <label className="col-span-2">
                <input type="email" placeholder="Email address" className="px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 w-full outline-none rounded-md focus:border-slate-500" required/>
              </label>
              <button type="submit" className="bg-orange-400 hover:bg-orange-500 focus:border-orange-100 outline-none w-full rounded-md">Subscribe</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}