import React from "react";

export default function Message() {
  return (
    <div className="max-w-md mx-auto rounded-lg bg-slate-200 shadow-xl p-6">
      <form>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded appearance-none focus:outline-none focus:border-primary focus:ring-primary"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="email">
            Email address
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded appearance-none focus:outline-none focus:border-primary focus:ring-primary"
            id="email"
            type="email"
            placeholder="Email address"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-bold text-gray-700" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-400 rounded resize-none h-32 appearance-none focus:outline-none focus:border-primary focus:ring-primary"
            id="message"
            rows="3"
            placeholder="Your message"
          ></textarea>
        </div>
        <button
          type="button"
          className="bg-gray-800 w-full px-4 py-2 text-sm font-medium text-gray-100 bg-primary rounded-md shadow hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Send
        </button>
      </form>
    </div>
  );
}

    // <form>
    //   {/*<!--Name input-->*/}
    //   <div>
    //     <input type="text" id="exampleInput7" placeholder="Name" />
    //     <label for="exampleInput7">Name</label>
    //   </div>

    //   {/*<!--Email-->*/}
    //   <div>
    //     <input type="email" id="exampleInput8" placeholder="Email address" />
    //     <label for="exampleInput8">Email address</label>
    //   </div>

    //   {/*<!--Mensaje-->*/}
    //   <div>
    //     <textarea
    //       id="exampleFormControlTextarea13"
    //       rows="3"
    //       placeholder="Message"
    //     ></textarea>
    //     <label for="exampleFormControlTextarea13">Message</label>
    //   </div>

    //   {/*<!--boton submit-->*/}
    //   <button type="submit" data-te-ripple-init data-te-ripple-color="light">
    //     Send
    //   </button>
    // </form>