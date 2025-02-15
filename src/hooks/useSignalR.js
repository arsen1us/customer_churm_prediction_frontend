import React, {createContext, useEffect, useState, useRef, useContext} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";