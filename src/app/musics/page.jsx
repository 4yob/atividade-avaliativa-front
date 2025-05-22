"use client";

import { Pagination, Modal, Card, Skeleton } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "./Musics.module.css";
import Image from "next/image";
import axios from "axios";

const Headers = {"x-api-key": process.env.NEXT_PUBLIC_API_KEY};

export default function Musics() {
    const [data, setData] = useState({
        musics: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    const [modal, setModal] = useState({
        visible: false,
        name: null,
        duration: null,
        singer: null,
        loading: false,
    });

    const [singer, setSinger] = useState({
        name: null,
        loading: false,
    });

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/musics`,
                    { headers: Headers }
                );
                setData({
                    musics: response.data,
                    loading: false,
                    current: 1,
                    pageSize: 5,
                });
            } catch (error) {
                console.error("Error fetching musics:", error);
                toast.error("Erro ao carregar as músicas");
                setData((d) => ({ ...d, loading: false }));
            }
        };
        fetchMusics();
    }, []);

    const openModal = async (music) => {
    setModal({
        visible: true,
        name: music.name,
        duration: music.duration,
        singer: music.singer,
        loading: false,
    });

    try {
        const { data: singers } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/singers/${music.singer}`,
            { headers: Headers }
        );
        setSinger({
            name: singers.name,
            loading: false,
        });
    } catch (error) {
        console.error("Error fetching singer:", error);
        toast.error("Erro ao carregar o cantor");
        setSinger((s) => ({ ...s, loading: false }));
    }
};

    const paginatedMusics = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.musics.slice(start, start + data.pageSize);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista de Músicas</h1>

            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.musics.length}
                onChange={(page, size) => 
                    setData((d) => ({ ...d, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "50"]}
            />

            {data.loading ? (
                <Skeleton active />
            ) : (
                <div className={styles.musicList}>
                    {paginatedMusics().map((music) => (
                        <Card
                            key={music.id}
                            hoverable
                            onClick={() => openModal(music)}
                            className={styles.card}
                            cover={
                                <Image
                                    className={styles.image}
                                    src={music.photo ? music.photo : "/img/220.svg"}
                                    alt={music.name}
                                    width={100}
                                    height={100}
                                />
                            }
                        >
                            <p>{music.name}</p>
                            <p>{music.duration}</p>
                        </Card>
                    ))}
                </div>
            )}

            <ToastContainer position="top-right" autoClose={5000} />

        </div>
    );
}