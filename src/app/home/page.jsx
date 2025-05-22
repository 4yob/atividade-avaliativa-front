import styles from "./Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.article}>
                <Image
                    src="/img/image.png"
                    alt="Logo"
                    width={250}
                    height={250}
                    className={styles.photo}
                />
                <h1 className={styles.title}>Alejandra Barros</h1>
                <h2 className={styles.subtitle}>2TDS1</h2>
                <p className={styles.p}>Instrutores</p>
                <p className={styles.p2}>Thiago Rodrigues e Marcello Carboni</p>
            </div>
            <div className={styles.aside}>
                <h1 className={styles.title2}>Atividade Avaliativa FRONT-END</h1>
                <p className={styles.description}>Esta atividade se baseia na atividade avaliativa de Back-End para o desenvolvimento de integração de interface gráfica com uma API. Desta forma, a atividade abrangerá uma listagem de <b>músicas e cantores</b> ordenados por cards informativos utilizando as linguagens <span className={styles.span1}>Next.JS</span> e <span className={styles.span2}>JavaScript</span>.</p>
                <div className={styles.bottom}>
                    <Link href="/singers">
                        <Button text="Avançar" />
                    </Link>
                </div>
            </div>
        </div>
    );
}