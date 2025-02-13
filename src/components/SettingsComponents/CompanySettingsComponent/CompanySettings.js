import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CompanySettings = () => {
    const {companyId} = useParams();

    return (
        <div>
            <div>
                <div>
                    <p>Блок настроек с названием</p>
                    <div>
                        <h3>Настройки компании</h3>
                    </div>
                </div>
                <div>
                    <p>Блок настроек</p>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                </div>
                <div>
                    <p>Блок настроек</p>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                </div>
                <div>
                    <p>Блок настроек</p>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                    <div>
                        <Link>Элемент настроек</Link>
                    </div>
                </div>
                <div>
                    <p>Блок настроек</p>
                    <div>
                        <Link>Удалить компанию</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanySettings;
