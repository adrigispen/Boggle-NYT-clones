import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h5>Games</h5>
        <nav>
          <ul>
            <li>
              <Link to={`/boggle`}>Speedy Boggle</Link>
            </li>
            <li>
              <Link to={`/spelling-bee`}>Spelling Bee</Link>
            </li>
            <li>
              <Link to={`/wordle`}>Wordle</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
}
