import { usBirdSpeciesCodes } from "../data/usBirds.js"
import axios from 'axios'
import {birdData} from "../data/birbdata.js"
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import cheerio from 'cheerio'

const jar = new CookieJar()
const client = wrapper(axios.create({ jar }))

const usSpecies = birdData

async function fetchHtml(webUrl) {
  try {
    let response = await client.get(webUrl)
    const $ = cheerio.load(response.data)
    let data = []
    data.push($('p[class=u-stack-sm]').text())
    return data
  } catch(error) {
    console.log(error)
  }
}


async function index(req, res) {
  try {
    res.render(`birbs/index`,{
        title: `All Birds`,
        usSpecies,
        },
      )
  } catch (error) {
    console.log(error)
    res.redirect(`/birbs/index`)
  }
}

async function getBird(speciesCode) {
  try {
    let apiUrl = `https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&species=${speciesCode}`
    const response = await axios.get(apiUrl)
    const body = response.data[0]
    const cornellLink = `https://ebird.org/species/${body.speciesCode}`
    const summaryArr = await fetchHtml(cornellLink)
    const summary = summaryArr[0]
    const bird = {
      commonName: body.comName,
      speciesName: body.sciName,
      speciesCode: body.speciesCode,
      familyComName: body.familyComName,
      cornellLink,
      summary
    }
    return bird
  } catch(error) {
    console.log(error)
  }
}

async function findBird(req, res) {
  try
    {
      const birdId = req.body.bird
      res.redirect(`/birbs/${birdId}`)
    } catch (error){
      console.log(error)
      res.redirect(`/birbs`)
    }
}

async function show(req, res) {
  try {
    const bird = await getBird(req.params.id)
    console.log(bird)
    res.render('birbs/show', {
      title: `${bird.commonName}`,
      bird

    })
  } catch(error) {
    console.log(error)
  }
}

export {
  index,
  show,
  findBird
}