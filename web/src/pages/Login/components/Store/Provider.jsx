import React from 'react'
import useStorage from '../../../../utils/Storage/useStorage'
import Context from './Context'

const StoreProvider = ({ childreen }) => {

    const [token,setToken] = useStorage('token')

    return (
        <Context.Provider>
            value={{
                token,
                setToken,
            }}
            {childreen}

        </Context.Provider>

    )

}

export default StoreProvider