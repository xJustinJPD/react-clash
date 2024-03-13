import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const MainPage = () => {
  const { authenticated } = useAuth();

  return (
    <div className="bg-primary min-h-screen">
      <header className="bg-accent text-white py-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-bold">Clash: Call of Duty Edition</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <section className="mb-8 text-center">
          <div className="bg-white rounded-lg p-8 mb-4">
            <h2 className="text-4xl font-bold mb-4">Compete, Dominate, Rise!</h2>
            <p className="text-lg mb-6">Join the ultimate Call of Duty battleground.</p>
            <p className="text-gray-700 mb-6">Clash: Call of Duty Edition is a platform designed for passionate gamers who want to compete, rise through the ranks, and establish themselves as top players in the Call of Duty community. Whether you're a seasoned veteran or a newcomer, Clash offers a variety of tournaments and challenges to test your skills and enhance your gaming experience.</p>
            {authenticated ? (
              <Link to="/teams" className="bg-accent text-white py-2 px-4 rounded-full hover:bg-accent-dark hover:text-white transition duration-300">My teams</Link>
            ) : (
              <Link to="/login" className="bg-accent text-white py-2 px-4 rounded-full hover:bg-accent-dark hover:text-white transition duration-300">Get Started</Link>
            )}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-2">Compete in Tournaments</h3>
              <p>Participate in thrilling Call of Duty tournaments and showcase your skills against the best players.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-2">Track Your Progress</h3>
              <p>Keep track of your gaming journey, monitor your rank, and strive for the top position.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-2">Join Multiple Teams</h3>
              <p>Be a part of various teams, collaborate with teammates, and make a name for yourself in the community.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-2">Build Your Community</h3>
              <p>Connect with fellow gamers, share experiences, and create your own gaming community.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainPage;
