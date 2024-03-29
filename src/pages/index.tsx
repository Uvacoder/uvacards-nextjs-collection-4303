import Head from 'next/head'
import {getProjects, Project} from 'lib/get-projects'
import {GetStaticPropsContext} from 'next'
import {Sound} from 'components/icons'
import {links} from 'components/bio'
import Me from '../../public/07A9B608-1E08-42E0-8D0B-6038A4D4D6A9.png'
import Layout from 'components/layout'
import Image from 'next/image'
import find from 'lodash/find'

export default function Home({projects}: any) {
  return (
    <Layout meta={{titleAppendSiteName: false}}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full max-w-screen-md mx-auto">
        <header className="py-24">
          <div className="flex space-x-4 items-center">
            <div className="flex items-center justify-center flex-shrink-0 sm:w-auto w-16 rounded-full overflow-hidden border-2 border-black/50">
              <Image
                src={Me}
                alt="basketball"
                width={80}
                height={80}
                placeholder="blur"
                className="rounded-full"
                priority
                loading="eager"
                quality={100}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Hey, I'm{' '}
                <button
                  type="button"
                  title="say out loud"
                  className="inline-flex font-bold items-center justify-center group transition-all ease-in-out duration-200"
                  onClick={() => {
                    let speech = new SpeechSynthesisUtterance()
                    speech.lang = 'cs'
                    speech.text = 'Vojta'
                    const voice = window.speechSynthesis
                      .getVoices()
                      .filter((voice) => voice.lang === 'cs-CZ')[0]
                    speech.voice = voice
                    window.speechSynthesis.speak(speech)
                  }}
                >
                  Ned{' '}
                  <Sound
                    aria-hidden="true"
                    className="ml-1 w-3 text-gray-200 group-hover:opacity-100 opacity-60"
                  />
                </button>
                <span role="img" aria-label="waving hand" className="pl-2">
                  👋
                </span>
              </h1>
              <h2 className="opacity-90">
                I'm a jack of all trades, master of none.
              </h2>
            </div>
          </div>
        </header>
        <h3 className="pb-4 text-gray-300">
          Projects I'm working on:
        </h3>
        <main className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full">
          {projects.map(({title, url, image, links, cursor}: Project) => {
            const caseStudy = find(links, {label: 'Case study'})
            return (
              <div
                key={title}
                className="overflow-hidden bg-black bg-opacity-30 hover:bg-opacity-50 flex w-full items-center flex-col justify-between rounded-lg min-h-[200px] hover:scale-105 transition-all ease-in-out duration-200"
              >
                <a
                  className="flex items-center justify-center flex-grow p-2 w-full"
                  style={{cursor: `url(${cursor}), pointer`}}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={image} alt={title} />
                  <span className="sr-only">{title}</span>
                </a>
                {caseStudy && (
                  <a
                    className="w-full border-t text-white/80 hover:text-white border-gray-900 hover:bg-gray-800/60 font-mono text-xs uppercase p-5 text-center"
                    href={caseStudy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Case study <span aria-hidden="true">↗︎</span>
                  </a>
                )}
              </div>
            )
          })}
        </main>
        <footer className="py-24 sm:flex grid grid-cols-2 -m-1 items-center w-full justify-center ">
          {links.map(({href, icon, label}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="m-1 flex items-center justify-center space-x-2 rounded-lg bg-gray-200 bg-opacity-5 px-3 py-2 text-sm hover:bg-opacity-10 transition-all ease-in-out duration-200"
            >
              {icon}
              <span>{label}</span>
            </a>
          ))}
        </footer>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const projects = getProjects()

  return {
    props: {
      projects,
    },
  }
}
