---
layout: page
order: 0
---

<div class="hero">
  <h1>ScaFi Aggregate Programming Toolkit</h1>
  <p class="lead">
    <strong>ScaFi</strong> (<strong>Sca</strong>la <strong>Fi</strong>elds) is a Scala-based library and framework for Aggregate Programming.
    It implements a variant of the Higher-Order Field Calculus (HOFC) operational semantics as a domain-specific language (DSL),
    and provides a platform and API for simulating and executing Aggregate Computing systems and applications.
  </p>
  <div class="actions">
    <a class="btn primary" href="{{ '/docs/' | relative_url }}">Get started</a>
    <a class="btn" href="{{ '/web/' | relative_url }}">Try it in the browser</a>
    <a class="btn" href="https://github.com/scafi/scafi">GitHub</a>
  </div>
</div>

<iframe class="demo" src="/web/index.html?embed=true&example=Gradient&layout=sim-only&autoplay=true&controls=false&theme=light&bg=clean" title="A ScaFi gradient running live in ScaFi Web" loading="lazy"></iframe>

### Learning Resources

- [ScaFi User Manual](/docs/#scafi-user-manual) and [ScaFi Developer Manual](/docs/#scafi-developer-manual)
- [hello-scafi](https://github.com/scafi/hello-scafi): basic usage of ScaFi
- [learning-scafi-alchemist](https://github.com/scafi/learning-scafi-alchemist): simulating aggregate systems with ScaFi in the Alchemist simulator
- [A tutorial repository on ScaFi and aggregate computing](https://bitbucket.org/gaudrito/alchemist-example), by G. Audrito
- [A tutorial on ScaFi delivered at ACSOS 2023](https://github.com/AggregateComputing/acsos-2023-scafi-tutorial)

### Usage ###

ScaFi is published for **Scala 3** and **Scala 2.13**.
`scafi-commons`, `scafi-core`, and `scafi-simulator` target both the JVM and JavaScript (via Scala.js);
the other modules (`scafi-simulator-gui`, `spala`, `scafi-distributed`) are available only for Scala 2.13 on the JVM.

**1.** Add the dependency to ScaFi, via sbt (`build.sbt`):

{% highlight scala %}
scalaVersion := "3.7.4" // or "2.13.18"

val scafiVersion = "{{ site.scafi }}"
libraryDependencies ++= Seq(
  "it.unibo.scafi" %% "scafi-core" % scafiVersion,
  "it.unibo.scafi" %% "scafi-simulator" % scafiVersion
)
// Scala 2.13 only: "scafi-simulator-gui", "scafi-distributed"
{% endhighlight %}

or via Gradle (`build.gradle.kts`):

{% highlight kotlin %}
dependencies {
    implementation("it.unibo.scafi:scafi-core_3:{{ site.scafi }}") // or scafi-core_2.13
}
{% endhighlight %}

**2.** Write an aggregate program:

{% highlight scala %}
package experiments

import it.unibo.scafi.incarnations.BasicSimulationIncarnation.{AggregateProgram, StandardSensorNames}

class MyAggregateProgram extends AggregateProgram with StandardSensorNames {

  override def main() = gradient(isSource)

  def gradient(source: Boolean): Double =
    rep(Double.PositiveInfinity){ distance =>
      mux(source) { 0.0 } {
        foldhoodPlus(Double.PositiveInfinity)(Math.min)(nbr{distance} + nbrRange)
      }
    }

  def isSource = sense[Boolean]("source")
  def nbrRange = nbrvar[Double](NBR_RANGE)
}
{% endhighlight %}

**3.** Run it in the simulator GUI (`scafi-simulator-gui`, Scala 2.13):

{% highlight scala %}
import it.unibo.scafi.simulation.frontend.{Launcher, Settings}

object SimulationRunner extends Launcher {
  Settings.Sim_ProgramClass = "experiments.MyAggregateProgram"
  Settings.ShowConfigPanel = false
  launch()
}
{% endhighlight %}

More information is available in the [ScaFi Documentation](/docs/).

### Related tools

- [Alchemist Simulator](https://alchemistsimulator.github.io/): a rich, flexible simulation framework that supports ScaFi
- [Protelis](https://protelis.github.io/): an external Aggregate Programming DSL

### People

#### Main Researchers and Authors ###

* Mirko Viroli
* Roberto Casadei
* Gianluca Aguzzi

#### Research Collaborators ###

* Danilo Pianini
* Giorgio Audrito
* Ferruccio Damiani

### Cite ScaFi ###

{% include cite.html %}

More papers that describe or use ScaFi are listed in [Papers](/papers/).

### Contacts ###

* roby [dot] casadei [at] unibo.it
* mirko [dot] viroli [at] unibo.it
