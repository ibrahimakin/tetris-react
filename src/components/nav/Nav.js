import React, { useState, useEffect } from 'react';
import './Nav.css';
//import { connect } from 'react-redux';
//import { setLangTR, setLangEN, getLang } from '../lang/actions';
import { TR, EN } from '../../lang/types';
import { tr, en } from './lang';
//import { Link } from 'react-router-dom';

const Nav = (props) => {

    const [text, setText] = useState(en);

    useEffect(() => {
        if (props.lang === TR) {
            setText(tr);
        }
        else { setText(en); }
    }, [props.lang]);

    return (
        <ul id="ul" >
            <li id="li"><a id="a" href="/">{text.home}</a></li>
            <li id="li" class="dropdown">
                <a id="a" href="javascript:void(0)" class="dropbtn">{text.games}</a>
                <div class="dropdown-content">
                    <a style={{ paddingTop: 0, paddingBottom: 0, height: 0, visibility: 'hidden' }}>{text.games}</a>
                    <a href="/games/bird" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>{text.bird}</a>
                    <a href="/games/snake">{text.snake}</a>
                    <a href="javascript:void(0)">{text.tetris}</a>
                </div>
            </li>
            <li id="li"><a id="a" href="/lcd-character-generator.html">{text.lcd_character_generator}</a></li>
            <li id="li"><a id="a" href="#" className="nav-link">{text.movies}</a></li>
            {/*<li id="li" class="dropdown">
                <a id="a" href="javascript:void(0)" class="dropbtn">{text.projects}</a>
                <div class="dropdown-content">
                    <a href="/tedbir" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>{text.tedbir}</a>
                    <a href="/uav">{text.uav}</a>
                    <a href="/login_app">{text.login_app}</a>
                    <a href="/latest_point">{text.latest_point}</a>
                    <a href="/omr">{text.omr}</a>
                    <a href="/piko_island">{text.piko_island}</a>
                </div>
    </li>*/}
            <li id="li" style={{ float: 'right' }} class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">{text.lang}</a>
                <div /*style={{ background: 'none' }}*/ class="lang-dropdown-content">
                    <a style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} onClick={() => { props.setLangStorage(TR); }}>TR</a>
                    <a style={{}} onClick={() => { props.setLangStorage(EN); }}>EN</a>
                </div>
            </li>
            <li id="li" style={{ float: 'right' }}><a id="a" href="https://about.me/iAKIN" target="_blank">{text.about}</a></li>

        </ul>
    )
};

export default Nav;