import React from 'react'

function Users() {
    return (
        <div id="last-users">
            <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
            <div className="overflow-x-scroll">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-black/60">
                        <tr>
                            <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                            <th className="text-left py-3 px-2">Email</th>
                            <th className="text-left py-3 px-2">Group</th>
                            <th className="text-left py-3 px-2">Status</th>
                            <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-700">
                            <td className="py-3 px-2 font-bold">
                                <div className="inline-flex space-x-3 items-center">
                                    <span><img className="rounded-full w-8 h-8" src="/img/Alan.jpeg" alt="" /></span>
                                    <span>Alan Luna</span>
                                </div>
                            </td>
                            <td className="py-3 px-2">alan.luna@cba.com</td>
                            <td className="py-3 px-2">User</td>
                            <td className="py-3 px-2">Approved</td>
                            <td className="py-3 px-2">
                                <div className="inline-flex items-center space-x-3">
                                    <a href="" title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    </a>
                                    <a href="" title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    </a>
                                    <a href="" title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-800">
                            <td className="py-3 px-2 font-bold">
                                <div className="inline-flex space-x-3 items-center">
                                    <span><img className="rounded-full w-8 h-8" src="/img/Pablo.jpg" alt="" /></span>
                                    <span>Pablo Pissoni</span>
                                </div>
                            </td>
                            <td className="py-3 px-2">pablo.pissoni@abc.com</td>
                            <td className="py-3 px-2">Administrator</td>
                            <td className="py-3 px-2">Approved</td>
                            <td className="py-3 px-2">
                                <div className="inline-flex items-center space-x-3">
                                    <a href="" title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    </a>
                                    <a href="" title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                    </a>
                                    <a href="" title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                    </a>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users