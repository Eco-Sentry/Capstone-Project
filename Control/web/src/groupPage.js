import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';


function groupPage() {
  return (
    <div className="groupPage">
      <header className="groupPage-header">
        <Navbar />
        <img src={logo} className="groupPage-logo" alt="logo" />
        <h1>Groups List</h1>
      </header>
      {/* Main page divider Table */}
      <table>
        <tr>
          <td>
            {/* Navigation Table */}
            <table>
              <tr>Sentries</tr>
              <tr>Settings</tr>
              <tr>Groups</tr>
            </table>
          </td>
          <td>
            <table>
              <tr>
                <th>Nodes</th>
                <th>Members</th>
              </tr>
              <tr>
                {/* Memeber Table */}
                <table>

                </table>
                {/* Node Table */}
                <table>

                </table>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default groupPage;
