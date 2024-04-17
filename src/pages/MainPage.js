import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const MainPage = () => {
  const { authenticated } = useAuth();

  return (
    <div className="bg-primary min-h-screen flex flex-col justify-between">
      <header className="bg-accent text-white py-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-bold">Clash: Call of Duty Edition</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 flex-grow">
        <section className="mb-8 text-center">
          <div className="bg-white rounded-lg p-8 mb-4">
            <h2 className="text-4xl font-bold mb-4">Clash against opponents, Unite with your team</h2>
            <h2 className="text-4xl font-bold mb-4">Welcome to Clash!</h2>
            <p className="text-lg mb-6">Are you ready to take your gaming experience to the next level? Look no further! Clash is the ultimate destination for competitive gamers like you.</p>
            <p className="text-gray-700 mb-6">Whether you're aiming to climb the leaderboards, compete in tournaments, or connect with fellow gamers, Clash has got you covered.</p>
            {authenticated ? (
              <Link to="/teams" className="bg-accent text-white py-2 px-4 rounded-full hover:bg-accent-dark hover:text-white transition duration-300">My Teams</Link>
            ) : (
              <Link to="/login" className="bg-accent text-white py-2 px-4 rounded-full hover:bg-accent-dark hover:text-white transition duration-300">Get Started</Link>
            )}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-2">Compete Against Gamers</h3>
              <p>Participate in thrilling Call of Duty leaderboards and showcase your skills against the best players.</p>
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
      <footer className="bg-accent text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Clash: Call of Duty Edition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
