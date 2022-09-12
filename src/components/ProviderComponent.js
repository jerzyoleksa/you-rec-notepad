import React, { useState, useEffect } from "react"

const functionTemplate = () => {}

const userObjectContext = {
  name: "John Snow",
  email: "john.snow@thewall.north",
  status: "Winter is coming",
  current: true,
  opener: false,
  updateStatus: functionTemplate,
}

const UserContext = React.createContext(userObjectContext)

const fetchUser = async () => {
  try {
    const res = await fetch("https://got-example.com/api/v1/user/102")
    return res.json()
  } catch (e) {
    console.error(e)
    return {
      name: "Not found",
      email: "Not found",
      status: "Not found"
    }
  }
}

const ProviderComponent = ({children}) => {
  const [context, setContext] = useState(userObjectContext)

  const updateContext = (contextUpdates = {}) =>
    setContext(currentContext => ({ ...currentContext, ...contextUpdates }))

  useEffect(() => {
    const populateContext = (contextUpdates = {}) =>
      setContext(currentContext => ({ ...currentContext, ...contextUpdates }))

    async function fetchData() {
      const user = await fetchUser()
      populateContext(user)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (context?.updateStatus === functionTemplate) {
      updateContext({
        updateStatus: value => updateContext({ status: value }),
      })
    }
  }, [context?.updateStatus])

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export { UserContext, ProviderComponent };