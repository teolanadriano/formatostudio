import style from './Header.module.css'
import { Scan } from 'lucide-react'

function Header(){
    return(
        <header className={style["header"]}>
            <a className={style["logo"]} href="#top">
                <span className={style["logo-icon"]}>
                    <Scan size={20} />
                </span>
                
                <span className={style["logo-name"]}>
                    FormatoStudio
                </span>
            </a>

            <nav className={style["nav"]}>
                <ul className={style["nav-links"]}>
                    <li><a href="#">Contato</a></li>
                    <li><a href="#">Sobre</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header