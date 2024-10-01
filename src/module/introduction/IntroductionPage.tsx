import ConnectingButtons from './ConnectingButtons';
import './IntroductionPage.css';

type IntroductionPageProps = {};
const IntroductionPage = ({}: IntroductionPageProps) => {
  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img
          className="introduction_page_image"
          src="/public/logo.png"
          alt="Game"
        />
        <div className="introduction_page_title">Welcome to the game</div>
        <div className="introduction_page_content">
          This is a simple game where you can play with your friends
        </div>
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default IntroductionPage;
