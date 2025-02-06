import { NavLink } from 'react-router-dom';
import HomeInactive from '/svg/home_inactive.svg'
import HomeActive from '/svg/home_active.svg'
import YogaActive from '/svg/yoga_active.svg'
import YogaInactive from '/svg/yoga_inactive.svg'
import MeditateActive from '/svg/meditate_active.svg'
import MeditateInactive from '/svg/meditate_inactive.svg'
import MusicActive from '/svg/music_active.svg'
import MusicInactive from '/svg/music_inactive.svg'
import ProfileActive from '/svg/profile_active.svg'
import ProfileInactive from '/svg/profile_inactive.svg'

export const Footer = () => {
  return (
    <footer className='flex justify-evenly fixed bottom-0 z-1 white-bg w-full
    p-2.5'>
      <NavLink to="/activity/:type">
      {({isActive}) => (
        <img src={isActive ? YogaActive : YogaInactive} alt="" className="w-12 h-12"/>
      )}
      </NavLink>

      <NavLink to="/activity/:type">
      {({isActive}) => (
        <img src={isActive ? MeditateActive : MeditateInactive} alt="" className="w-14 h-12"/>
      )}
      </NavLink>

      <NavLink to="/home">
      {({isActive}) => (
        <img src={isActive ? HomeActive : HomeInactive} alt="" className="w-12 h-12"/>
      )}
      </NavLink>

      <NavLink to="/music">
      {({isActive}) => (
        <img src={isActive ? MusicActive : MusicInactive} alt="" className="w-12 h-12"/>
      )}
      </NavLink>

      <NavLink to="/profile">
      {({isActive}) => (
        <img src={isActive ? ProfileActive : ProfileInactive} alt="" className="w-12 h-12"/>
      )}
      </NavLink>
    </footer>
  );
};