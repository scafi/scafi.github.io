---
layout: home
title: Home
order: 0
main: true
excerpt: scafi (Scala with computational Fields) is a field calculus-based DSL and toolkit for Aggregate Programming, providing a support for globally describing and executing self-organising, collective adaptive systems made of a networked set of logical situated devices.
---

# ScaFi Aggregate Programming Toolkit #


### Introduction ###

**ScaFi** (**Sca**la **Fi**elds) is a Scala-based library and framework for Aggregate Programming.
It implements a variant of the Higher-Order Field Calculus (HOFC) operational semantics,
which is made available as a usable domain-specific language (DSL),
and provides a platform and API for simulating and executing Aggregate Computing systems and applications.

### Learning Resources

- [ScaFi User Manual](/docs/#scafi-user-manual)
- [ScaFi Developer Manual](/docs/#scafi-developer-manual)
- [https://github.com/scafi/hello-scafi](https://github.com/scafi/hello-scafi) : shows basic usage of ScaFi
- [https://github.com/scafi/learning-scafi-alchemist](https://github.com/scafi/learning-scafi-alchemist) : shows how to use ScaFi within the Alchemist simulator in order to simulate aggregate systems
- [A tutorial repository on ScaFi and aggregate computing by G. Audrito](https://bitbucket.org/gaudrito/alchemist-example)

### Usage ###

<!-- **NOTE:** the following examples and instructions may not be up-to-date; please refer to the `demos` module in the project repository for up-to-date information. -->

Notes

- ScaFi >= 0.3.3 cross-compiles for Scala 2.11, 2.12, 2.13.

<!-- - Before ScaFi 0.3.3, the group ID `it.unibo.apice.scafiteam` was used instead of the current **`it.unibo.scafi`** -->

#### Steps

* Add the dependency to scafi in your project, e.g., via sbt (`build.sbt`):

{% highlight scala %}

val scafiVersion = "{{ site.scafi }}"
val scafi_core  = "it.unibo.scafi" %% "scafi-core"  % scafiVersion
val scafi_simulator  = "it.unibo.scafi" %% "scafi-simulator"  % scafiVersion
val scafi_simulator_gui  = "it.unibo.scafi" %% "scafi-simulator-gui"  % scafiVersion
val scafi_platform = "it.unibo.scafi" %% "scafi-distributed"  % scafiVersion

libraryDependencies ++= Seq(scafi_core, scafi_simulator_gui, scafi_platform)
{% endhighlight %}

or via Gradle (`build.gradle.kts`):

{% highlight kotlin %}
plugins {
    java
    scala
}

dependencies {
    val scalaMajor = "2.12"
    val scafiVersion = "{{ site.scafi }}"
    implementation("org.scala-lang:scala-library:2.12.14")
    implementation("it.unibo.scafi:scafi-core_$scalaMajor:$scafiVersion")
    implementation("it.unibo.scafi:scafi-simulator-gui_$scalaMajor:$scafiVersion")
}
{% endhighlight %}
<!--
// the following may be needed when running using Java 11
tasks.withType<ScalaCompile> {
    sourceCompatibility = "1.8"
    targetCompatibility = "1.8"
}
-->

* Use the API (e.g., to set up a simple simulation)


{% highlight scala %}
package experiments

import it.unibo.scafi.incarnations.BasicSimulationIncarnation.AggregateProgram

object MyAggregateProgram extends AggregateProgram {

  override def main() = gradient(isSource)

  def gradient(source: Boolean): Double =
    rep(Double.PositiveInfinity){ distance =>
      mux(source) { 0.0 } {
        foldhood(Double.PositiveInfinity)(Math.min)(nbr{distance}+nbrRange)
      }
    }

  def isSource = sense[Boolean]("source")
  def nbrRange = nbrvar[Double](NBR_RANGE_NAME)
}

import it.unibo.scafi.simulation.gui.{Launcher, Settings}

object SimulationRunner extends Launcher {
  Settings.Sim_ProgramClass = "experiments.MyAggregateProgram"
  Settings.ShowConfigPanel = true
  launch()
}
{% endhighlight %}

More information is available in the [ScaFi Documentation](/docs/).


### Related tools

- [Alchemist Simulator](http://alchemistsimulator.github.io/): a rich, flexible simulation framework that supports ScaFi
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

### References ###

* See [papers](/papers/)

### Contacts ###

* roby [dot] casadei [at] unibo.it
* mirko [dot] viroli [at] unibo.it
