import styles from '../styles/Hello.module.css'

const Hello = () => {
  console.log('styles', styles)
  return <div className={styles.container}>Hello World</div>
}

export default Hello
