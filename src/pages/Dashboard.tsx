import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import GeneratorForm from '../components/GeneratorForm'
import TokenCounter from '../components/TokenCounter'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          Welcome, {user?.username}
        </h1>
        <TokenCounter />
      </div>

      <GeneratorForm />
    </div>
  )
}

export default Dashboard