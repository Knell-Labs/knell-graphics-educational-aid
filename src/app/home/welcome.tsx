import Button from '../../../components/ui/button';

interface WelcomeProps {
  handleAction: (action: "create" | "login" | "") => void;
}

const Welcome: React.FC<WelcomeProps> = ( ({ handleAction }) => (<div>
    <p className="my-2">
      <span className="font-medium text-lg">{"🔹 Dive Right Back In!\n"}</span>
      {"Login to pick up where you left off and access your saved 3D creations.\n\n"}
      <span className="font-medium text-lg">{"🔹 Just Browsing?\n"}</span>
      {"Continue as a guest and explore our powerful 3D modeling tools. Remember, any progress won't be saved.\n\n"}
      <span className="font-medium text-lg">{"🔹 Collaborate in Real-Time!\n"}</span>
      {"Create, share, and collaborate on your 3D projects by sharing unique links with fellow creators.\n\n"}
      <span className="font-bold text-xl">{"Happy Modeling! 🛠🌐"}</span>
    </p>
    <div className="w-full flex justify-around gap-2">
      <Button variant="primary" fullWidth onClick={ () => handleAction("login") }>
        Login
      </Button>
      <Button variant="secondary" fullWidth onClick={ () => handleAction("") }>
        Continue as Guest
      </Button>
    </div>
    <div className="mt-2">
      <Button variant="outline" fullWidth onClick={ () => handleAction("create") } size="small">
        Create an Account
      </Button>
    </div>
  </div>));

export default Welcome;