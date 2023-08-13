import{_ as p,r as o,o as c,c as l,a as n,b as a,d as e,e as t}from"./app-1fc26757.js";const u={},k={id:"kubernetes",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#kubernetes","aria-hidden":"true"},"#",-1),r={href:"https://www.bilibili.com/video/BV1cd4y1J7qE?p=74&vd_source=629395ac7befa1625191c3f496068941",target:"_blank",rel:"noopener noreferrer"},d=t('<p>官网：https://kubernetes.io/zh-cn/</p><h2 id="第一章-初识-kubernetes" tabindex="-1"><a class="header-anchor" href="#第一章-初识-kubernetes" aria-hidden="true">#</a> 第一章 初识 Kubernetes</h2><ul><li>Kubernetes 简介</li><li>为什么需要 Kubernetes</li><li>Kubernetes 能做什么</li><li>Kubernetes 不是什么？</li></ul><h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1 简介</h3><blockquote><p>摘取官网：https://kubernetes.io/zh-cn/docs/concepts/overview/</p></blockquote>',5),m=n("strong",null,"Kubernetes",-1),y=n("code",null,"舵手",-1),h=n("code",null,"飞行员",-1),g={href:"https://research.google/pubs/pub43438",target:"_blank",rel:"noopener noreferrer"},b=t('<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/157aac73e8f48beb8adff99d476c1e1a.png" alt="image-20230728155640161"></p><p>Kubernetes 是一个可移植、可扩展的开源平台，用于 <code>管理容器化的工作负载和服务，可促进声明式配置和自动化</code> 。 Kubernetes 拥有一个庞大且快速增长的生态，其服务、支持和工具的使用范围相当广泛。</p><p>从 2014 年第一个版本发布以来，Kubernetes 迅速获得开源社区的追捧，包括 Red Hat、VMware、Canonical 在内的很多有影响力的公司加入到开发和推广的阵营。目前 Kubernetes 已经成为发展最快、市场占有率最高的容器编排引擎产品。</p><h3 id="_2-为什么需要-k8s" tabindex="-1"><a class="header-anchor" href="#_2-为什么需要-k8s" aria-hidden="true">#</a> 2 为什么需要 k8s</h3><blockquote><p>摘取官网：https://kubernetes.io/zh-cn/docs/concepts/overview/</p></blockquote><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/d83692abcc8ad20766834640ce9d644b.svg" alt="部署演进"><strong>传统部署时代：</strong></p><p>早期，各个组织是在物理服务器上运行应用程序。 <code>由于无法限制在物理服务器中运行的应用程序资源使用，因此会导致资源分配问题</code>。 例如，如果在同一台物理服务器上运行多个应用程序， 则可能会出现一个应用程序占用大部分资源的情况，而导致其他应用程序的性能下降。 <code>一种解决方案是将每个应用程序都运行在不同的物理服务器上， 但是当某个应用程序资源利用率不高时，剩余资源无法被分配给其他应用程序， 而且维护许多物理服务器的成本很高</code>。</p><p><strong>虚拟化部署时代：</strong></p><p>因此，虚拟化技术被引入了。虚拟化技术允许你在单个物理服务器的 CPU 上运行多台虚拟机（VM）。 <code>虚拟化能使应用程序在不同 VM 之间被彼此隔离，且能提供一定程度的安全性， 因为一个应用程序的信息不能被另一应用程序随意访问</code>。</p><p>虚拟化技术能够更好地利用物理服务器的资源，并且因为可轻松地添加或更新应用程序， 而因此可以具有更高的可扩缩性，以及降低硬件成本等等的好处。 通过虚拟化，你可以将一组物理资源呈现为可丢弃的虚拟机集群。</p><p><code>每个 VM 是一台完整的计算机，在虚拟化硬件之上运行所有组件，包括其自己的操作系统。</code></p><p><strong>容器部署时代：</strong></p><p>容器类似于 VM，但是更宽松的隔离特性，使容器之间可以共享操作系统（OS）。 因此，容器比起 VM 被认为是更轻量级的。且与 VM 类似，每个容器都具有自己的文件系统、CPU、内存、进程空间等。 由于它们与基础架构分离，因此可以跨云和 OS 发行版本进行移植。<code>容器的出现解决了应用和基础环境异构的问题，让应用可以做到一次构建，多次部署</code>。不可否认容器是打包和运行应用程序的好方式，因此容器方式部署变得流行起来。但随着容器部署流行，仅仅是基于容器的部署仍有一些问题没有解决：</p><ul><li>生产环境中，你需要管理运行着应用程序的容器，并确保服务不会下线。 例如，如果一个容器发生故障，则你需要启动另一个容器。</li><li>高并发时，你需要启动多个应用程序容器为系统提高高可用，并保证多个容器能负载均衡。</li><li>在维护、升级版本时，你需要将运行应用程序容器重新部署，部署时必须对之前应用容器备份，一旦出现错误，需要手动启动之前容器保证系统运行。</li></ul><p><code>如果以上行为交由给系统处理，是不是会更容易一些？那么谁能做到这些？</code></p><h3 id="_3-k8s-能做什么" tabindex="-1"><a class="header-anchor" href="#_3-k8s-能做什么" aria-hidden="true">#</a> 3 k8s 能做什么？</h3><blockquote><p>摘取官网：https://kubernetes.io/zh-cn/docs/concepts/overview/</p></blockquote><p>这就是 Kubernetes 要来做的事情！ <code>Kubernetes 为你提供了一个可弹性运行分布式系统的框架</code>。 Kubernetes 会满足你的扩展要求、故障转移你的应用、提供部署模式等。</p><p>Kubernetes 为你提供：</p><ul><li><p><strong>服务发现和负载均衡</strong></p><p>Kubernetes 可以使用 DNS 名称或自己的 IP 地址来暴露容器。 如果进入容器的流量很大， Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定。</p></li><li><p><strong>存储编排</strong></p><p>Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。</p></li><li><p><strong>自动部署和回滚</strong></p><p>你可以使用 Kubernetes 描述已部署容器的所需状态， 它可以以受控的速率将实际状态更改为期望状态。 例如，你可以自动化 Kubernetes 来为你的部署创建新容器， 删除现有容器并将它们的所有资源用于新容器。</p></li><li><p><strong>自动完成装箱计算(自动资源调度)</strong></p><p>你为 Kubernetes 提供许多节点组成的集群，在这个集群上运行容器化的任务。 你告诉 Kubernetes 每个容器需要多少 CPU 和内存 (RAM)。 Kubernetes 可以将这些容器按实际情况调度到你的节点上，以最佳方式利用你的资源。</p></li><li><p><strong>自我修复(自愈能力)</strong></p><p>Kubernetes 将重新启动失败的容器、替换容器、杀死不响应用户定义的运行状况检查的容器， 并且在准备好服务之前不将其通告给客户端。</p></li><li><p><strong>密钥与配置管理</strong></p><p>Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 SSH 密钥。 你可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。</p></li></ul><h3 id="_4-k8s-不是什么" tabindex="-1"><a class="header-anchor" href="#_4-k8s-不是什么" aria-hidden="true">#</a> 4 k8s 不是什么？</h3><p><code>Kubernetes 不是传统的、包罗万象的 PaaS（平台即服务）系统</code>。 由于 Kubernetes 是在容器级别运行，而非在硬件级别，它提供了 PaaS 产品共有的一些普遍适用的功能， 例如部署、扩展、负载均衡，允许用户集成他们的日志记录、监控和警报方案。 但是，<code>Kubernetes 不是单体式（monolithic）系统</code>，那些默认解决方案都是可选、可插拔的。 Kubernetes 为构建开发人员平台提供了基础，但是在重要的地方保留了用户选择权，能有更高的灵活性。</p><p>Kubernetes：</p>',23),v=n("li",null,[n("p",null,"不限制支持的应用程序类型。 Kubernetes 旨在支持极其多种多样的工作负载，包括无状态、有状态和数据处理工作负载。 如果应用程序可以在容器中运行，那么它应该可以在 Kubernetes 上很好地运行。")],-1),f=n("li",null,[n("p",null,"不部署源代码，也不构建你的应用程序。 持续集成（CI）、交付和部署（CI/CD）工作流取决于组织的文化和偏好以及技术要求。")],-1),P={href:"https://openservicebrokerapi.org/",target:"_blank",rel:"noopener noreferrer"},x=n("li",null,[n("p",null,"不是日志记录、监视或警报的解决方案。 它集成了一些功能作为概念证明，并提供了收集和导出指标的机制。")],-1),q=n("li",null,[n("p",null,"不提供也不要求配置用的语言、系统（例如 jsonnet），它提供了声明性 API， 该声明性 API 可以由任意形式的声明性规范所构成。")],-1),_=n("li",null,[n("p",null,"不提供也不采用任何全面的机器配置、维护、管理或自我修复系统。")],-1),S=n("li",null,[n("p",null,"此外，Kubernetes 不仅仅是一个编排系统，实际上它消除了编排的需要。 编排的技术定义是执行已定义的工作流程：首先执行 A，然后执行 B，再执行 C。 而 Kubernetes 包含了一组独立可组合的控制过程，可以持续地将当前状态驱动到所提供的预期状态。 你不需要在乎如何从 A 移动到 C，也不需要集中控制，这使得系统更易于使用且功能更强大、 系统更健壮，更为弹性和可扩展。")],-1),C=t(`<hr><h2 id="第二章-组件-架构" tabindex="-1"><a class="header-anchor" href="#第二章-组件-架构" aria-hidden="true">#</a> 第二章 组件&amp;架构</h2><ul><li>集群组件</li><li>核心概念</li><li>集群安装</li></ul><h3 id="_1-集群组件" tabindex="-1"><a class="header-anchor" href="#_1-集群组件" aria-hidden="true">#</a> 1 集群组件</h3><ul><li>集群 cluster: 将同一个软件服务多个节点组织到一起共同为系统提供服务过程称之为该软件的集群。redis集群、es集群、mongo集群 等。</li><li>k8s 集群: <ul><li>多个节点: 3 个节点</li><li>角色: 1 个 master 节点/control plane 控制节点，2 个 work node: 工作节点(pod 容器:应用程序容器)</li></ul></li></ul><p>当部署完 Kubernetes，便拥有了一个完整的集群。一组工作机器，称为节点，会运行容器化应用程序。<code>每个集群至少有一个工作节点</code> 。工作节点会 <code>托管Pod</code> ，而 Pod 就是作为应用负载的组件。<code>控制平面管理集群中的工作节点和 Pod</code> 。</p><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/25b36a692865548e2befda341c7377bf.jpg" alt="k8s 组件介绍 - 知乎"></p><h4 id="_1-1-控制平面组件-control-plane-components" tabindex="-1"><a class="header-anchor" href="#_1-1-控制平面组件-control-plane-components" aria-hidden="true">#</a> 1.1 控制平面组件 (Control Plane Components)</h4><p>控制平面组件会为集群做出全局决策，比如<code>资源的调度。以及检测和响应集群事件，例如当不满足部署的 replicas 字段时，要启动新的 Pod</code> 。</p><blockquote><p>控制平面组件可以在集群中的任何节点上运行。然而，为了简单起见，设置脚本通常会在同一个计算机上启动所有控制平面组件，并且不会在此计算机上运行用户容器。</p></blockquote><ul><li><p><strong>kube-apiserver</strong></p><p>API server是 Kubernetes 控制平面的组件，<code>该组件负责公开了 Kubernetes API，负责处理接受请求的工作</code>。API serve 是 Kubernetes控制平面的前端。Kubernetes API 服务器的主要实现是 kube-apiserver。<code>kube-apiserver</code> 设计上考虑了水平扩缩，也就是说，它可通过部署多个实例来进行扩缩。 你可以运行 <code>kube-apiserver</code> 的多个实例，并在这些实例之间平衡流量。</p></li><li><p><strong>etcd</strong></p><p><code>一致且高度可用的键值存储，用作 Kubernetes 的所有集群数据的后台数据库</code>。</p></li><li><p><strong>kube-scheduler</strong></p><p><code>kube-scheduler</code> 是控制平面的组件，负责监视新创建的、未指定运行节点 node 的 Pods 并选择节点来让 Pod 在上面运行。调度决策考虑的因素包括单个 Pod 及 Pods 集合的资源需求、软件及策略约束、亲和性及反亲和性规范、数据位置、工作负间的干扰及最后时限。</p></li><li><p><strong>kube-controller-manager</strong></p><p>kube-controller-manager 是控制平面的组件， 负责运行控制器进程。从逻辑上讲，每个控制器都是一个单独的进程，但是为了降低复杂性，它们都被编译到同一个可执行文件，并在同一个进程中运行。</p><p>这些控制器包括:</p><ul><li>节点控制器(Node Controller): 负责在节点出现故障时进行通知和响应。</li><li>任务控制器(Job Controller): 监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成。</li><li>端点分片控制器(EndpointSlice Controller): 填充端点分片(EndpointSlice) 对象 (以提供 Service 和 Pod 之间的链接) 。</li><li>服务账号控制器(ServiceAccount Controller): 为新的命名空间创建默认的服务账号 (ServiceAccount) 。</li></ul></li><li><p><strong>cloud-controller-manager</strong> (optional 可选)</p><p>一个 Kubernetes 控制平面组件，嵌入了特定于云平台的控制逻辑。云控制器管理器 (Cloud Controller Manager) 允许你将你的集群连接到云提供商的 API 之上，并将与该云平台交互的组件同与你的集群交互的组件分离开来。<code>cloud-controller-manager</code> 仅运行特定于云平台的控制器。因此如果你在自己的环境中运行 Kubernetes，或者在本地计算机中运行学习环境。 所部署的集群不需要有云控制器管理器。与 <code>kube-controller-manager</code> 类似， <code>cloud-controller-manager</code> 将若干上独立的控制回路组合到同一个可执行文件中，供你以同一进程的方式运行。你可以对其执行水平扩容 (运行不止一个副本) 以提升性能或者增强容错能力。</p><p>下面的控制器都包含对云平台驱动的依赖:</p><ul><li>节点控制器(Node Controller): 用于在节点终止响应后检查云提供商以确定节点是否已被删除</li><li>路由控制器(Route Controller): 用于在底层云基础架构中设置路由</li><li>服务控制器(Service Controller): 用于创建、更新和制除云提供商负载均衡器</li></ul></li></ul><h4 id="_1-2-node-组件" tabindex="-1"><a class="header-anchor" href="#_1-2-node-组件" aria-hidden="true">#</a> 1.2 Node 组件</h4><blockquote><p>节点组件会在每个节点上运行，负责维护运行的 Pod 并提供 Kubernetes 运行环境。</p></blockquote><ul><li><p><strong>kubelet</strong></p><p>kubelet 会在集群中每个节点 (node) 上运行。它保证容器 (containers) 都运行在 Pods 中。</p><p>kubelet 接收一组通过各类机制提供给它的 PodSpecs, 确保这些 PodSpecs 中描述的容器处于运行状态且健康。kubelet 不会管理不是 Kubernetes 创建的容器。</p></li><li><p><strong>kube-proxy</strong></p><p>kube-proxy 是集群中每个节点 (node) 上所运行的网络代理，实现 Kubernetes 服务 (Service) 概念的一部分。</p><p>kube-proxy 维护节点上的一些网络规则， 这些网络规则会允许从集群内部或外部的网络会话与 Pod 进行网络通信。</p><p>如果操作系统提供了可用的数据包过滤层，则 kube-proxy 会通过它来实现网络规则。否则，kube-proxy 仅做流量转发。</p></li><li><p><strong>容器运行时 (Container Runtime)</strong></p><p>容器运行环境是负责运行容器的软件。</p><p>Kubernetes 支持许多容器运行环境，例如 contanerd、CRI-O、Docker 以及 Kubernetes CRI 的其他任何实现。</p></li></ul><h4 id="_1-3-插件-addons" tabindex="-1"><a class="header-anchor" href="#_1-3-插件-addons" aria-hidden="true">#</a> 1.3 插件 (Addons)</h4><ul><li><p><strong>DNS</strong></p><p>尽管其他插件都并非严格意义上的必需组件，但几乎所有 Kubernetes 集群都应该有集群 DNS。因为很多示例都需要 DNS 服务。</p></li><li><p><strong>Web 界面 (仪表盘)</strong></p><p>Dashboard 是 Kubernetes 集群的通用的、基于 Web 的用户界面。它使用户可以管理集群中运行的应用程序以及集群本身，并进行故障排除。</p></li><li><p><strong>容器资源监控</strong></p><p>容器资源监控将关于容器的一些常见的时间序列度量值保存到一个集中的数据库中，并提供浏览这些数据的界面。</p></li><li><p><strong>集群层面日志</strong></p><p>集群层面日志机制负责将容器的日志数据保存到一个集中的日志存储中，这种集中日志存储提供搜索和浏览接口。</p></li></ul><h3 id="_2-集群架构详细" tabindex="-1"><a class="header-anchor" href="#_2-集群架构详细" aria-hidden="true">#</a> 2 集群架构详细</h3><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/2014ecb961976a497f1a5ac5f5f99554.png" alt="11-K8s架构及基本概念 - 图1"></p><ul><li><strong>总结</strong><ul><li>Kubernetes 集群由多个节点组成，节点分为两类: 一类是属于管理平面的主节点/控制节点 (Master Node) ；一类是属于运行平面的工作节点 (Worker Node) 。显然，复杂的工作肯定都交给控制节点去做了，工作节点负责提供稳定的操作接口和能力抽象即可。</li></ul></li></ul><h3 id="_3-集群搭建-重点" tabindex="-1"><a class="header-anchor" href="#_3-集群搭建-重点" aria-hidden="true">#</a> 3 集群搭建[重点]</h3><ul><li><p><strong>minikube</strong></p><p>只是一个 K8S 集群模拟器，只有一个节点的集群，只为测试用，master 和 worker 都在一起</p></li><li><p><strong>裸机安装</strong></p><p>至少需要两台机器 (主节点、工作节点个一台) ，需要自己安装 Kubernetes 组件，配置会稍微麻烦点。</p><p>缺点: 配置麻烦，缺少生态支持，例如负载均衡器、云存储。</p></li><li><p><strong>直接用云平台 Kubernetes</strong></p><p>可视化搭建，只需简单几步就可以创建好一个集群。</p><p>优点: 安装简单，生态齐全，负载均衡器、存储等都给你配套好，简单操作就搞定</p></li><li><p><strong>k3s</strong></p><p>安装简单，脚本自动完成。</p><p>优点: 轻量级，配置要求低，安装简单，生态齐全。</p></li></ul><h4 id="_3-1-minikube" tabindex="-1"><a class="header-anchor" href="#_3-1-minikube" aria-hidden="true">#</a> 3.1 minikube</h4><blockquote><p>Docker官网：https://www.docker.com/</p></blockquote><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/7fcd4ece79f0df0349af82542e706074.png" alt="image-20230728172728017"></p><h4 id="_3-2-裸机安装" tabindex="-1"><a class="header-anchor" href="#_3-2-裸机安装" aria-hidden="true">#</a> 3.2 裸机安装</h4><h5 id="_0-环境准备" tabindex="-1"><a class="header-anchor" href="#_0-环境准备" aria-hidden="true">#</a> 0 环境准备</h5><ul><li>节点数量: 3 台虚拟机 centos7</li><li>硬件配置: 2G或更多的RAM，2个CPU或更多的CPU，硬盘至少30G 以上</li><li>网络要求: 多个节点之间网络互通，每个节点能访问外网</li></ul><h5 id="_1-集群规划" tabindex="-1"><a class="header-anchor" href="#_1-集群规划" aria-hidden="true">#</a> 1 集群规划</h5><ul><li>k8s-node1: 10.15.0.5</li><li>k8s-node2: 10.15.0.6</li><li>k8s-node3: 10.15.0.7</li></ul><h5 id="_2-设置主机名" tabindex="-1"><a class="header-anchor" href="#_2-设置主机名" aria-hidden="true">#</a> 2 设置主机名</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>hostnamectl set-hostname k8s-node1
hostnamectl set-hostname k8s-node2
hostnamectl set-hostname k8s-node3
</code></pre></div><h5 id="_3-同步-hosts-文件" tabindex="-1"><a class="header-anchor" href="#_3-同步-hosts-文件" aria-hidden="true">#</a> 3 同步 hosts 文件</h5><blockquote><p>如果 DNS 不支持主机名称解析，还需要在每台机器的 <code>/etc/hosts</code> 文件中添加主机名和 IP 的对应关系:</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/hosts <span class="token operator">&lt;&lt;</span><span class="token string">EOF
10.15.0.5 k8s-node1
10.15.0.6 k8s-node2
10.15.0.7 k8s-node3
EOF</span>
</code></pre></div><h5 id="_4-关闭防火墙" tabindex="-1"><a class="header-anchor" href="#_4-关闭防火墙" aria-hidden="true">#</a> 4 关闭防火墙</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld
</code></pre></div><h5 id="_5-关闭-selinux" tabindex="-1"><a class="header-anchor" href="#_5-关闭-selinux" aria-hidden="true">#</a> 5 关闭 SELINUX</h5><blockquote><p>注意: ARM 架构请勿执行，执行会出现 ip 无法获取问题!</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>setenforce <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39;</span> /etc/selinux/config
</code></pre></div><h5 id="_6-关闭-swap-分区" tabindex="-1"><a class="header-anchor" href="#_6-关闭-swap-分区" aria-hidden="true">#</a> 6 关闭 swap 分区</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>swapoff <span class="token parameter variable">-a</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> /etc/fstab
</code></pre></div><h5 id="_7-同步时间" tabindex="-1"><a class="header-anchor" href="#_7-同步时间" aria-hidden="true">#</a> 7 同步时间</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> ntpdate <span class="token parameter variable">-y</span>
ntpdate time.windows.com
</code></pre></div><h5 id="_9-安装-containerd" tabindex="-1"><a class="header-anchor" href="#_9-安装-containerd" aria-hidden="true">#</a> 9 安装 containerd</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 yum-config-manager 相关依赖</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
<span class="token comment"># 添加 containerd yum 源</span>
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment"># 安装 containerd</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> containerd.io cri-tools
<span class="token comment"># 配置 containerd</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/containerd/config.toml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
disabled_plugins = [&quot;restart&quot;]
[plugins.linux]
shim_debug = true
[plugins.cri.registry.mirrors.&quot;docker.io&quot;]
endpoint = [&quot;https://frz7i079.mirror.aliyuncs.com&quot;]
[plugins.cri]
sandbox_image = &quot;registry.aliyuncs.com/google_containers/pause:3.2&quot;
EOF</span>
<span class="token comment"># 启动 containerd 服务 并 开机配置自启动</span>
systemctl <span class="token builtin class-name">enable</span> containerd <span class="token operator">&amp;&amp;</span> systemctl start containerd <span class="token operator">&amp;&amp;</span> systemctl status containerd

<span class="token comment"># 配置 containerd 配置</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/modules-load.d/containerd.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
overlay
br_netfilter
EOF</span>

<span class="token comment"># 配置 k8s 网络配置</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysctl.d/k8s.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF</span>

<span class="token comment"># 加载 overlay br_netfilter 模块</span>
modprobe overlay
modprobe br_netfilter

<span class="token comment"># 查看当前配置是否生效</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.d/k8s.conf
</code></pre></div><h5 id="_9-添加源" tabindex="-1"><a class="header-anchor" href="#_9-添加源" aria-hidden="true">#</a> 9 添加源</h5><ul><li>查看源</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>yum repolist
</code></pre></div><ul><li>添加源 x86</li></ul><blockquote><p>Kubernetes镜像：https://developer.aliyun.com/mirror/kubernetes</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>
</code></pre></div><ul><li>添加源 ARM</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-aarch64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>
</code></pre></div><h5 id="_11-安装-k8s" tabindex="-1"><a class="header-anchor" href="#_11-安装-k8s" aria-hidden="true">#</a> 11 安装 k8s</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装最新版本</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet kubeadm kubectl

<span class="token comment"># 指定版本安装</span>
<span class="token comment"># yum install-y kubelet-1.26.0 kubectl-1.26.0 kubeadm-1.26.0</span>

<span class="token comment"># 启动 kubelet</span>
<span class="token function">sudo</span> systemcti <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> systemctl start kubelet <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> systemctl status kubelet
</code></pre></div><h5 id="_12-初始化集群" tabindex="-1"><a class="header-anchor" href="#_12-初始化集群" aria-hidden="true">#</a> 12 初始化集群</h5><ul><li><code>注意: 初始化 k8s 集群仅仅需要再在 master 节点进行集群初始化!</code></li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubeadm init
--apiserver-advertise-address<span class="token operator">=</span><span class="token number">10.15</span>.0.5 <span class="token punctuation">\\</span>
--pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16 <span class="token punctuation">\\</span>
--image-repository registry.aliyuncs.com/google_containers
</code></pre></div><h5 id="_13-配置集群网络" tabindex="-1"><a class="header-anchor" href="#_13-配置集群网络" aria-hidden="true">#</a> 13 配置集群网络</h5><blockquote><p>创建配置: <code>kube-flanne.yml</code> ,执行 <code>kubectl apply -f kube-flannel.yml</code></p></blockquote><ul><li><code>注意: 只在主节点执行即可!</code></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">pod-security.kubernetes.io/enforce</span><span class="token punctuation">:</span> privileged
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;&quot;</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> pods
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;&quot;</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> nodes
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
  <span class="token punctuation">-</span> list
  <span class="token punctuation">-</span> watch
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;&quot;</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> nodes/status
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> patch
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel<span class="token punctuation">-</span>cfg
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">tier</span><span class="token punctuation">:</span> node
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> flannel
    <span class="token key atrule">app</span><span class="token punctuation">:</span> flannel
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">cni-conf.json</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    {
      &quot;name&quot;: &quot;cbr0&quot;,
      &quot;cniVersion&quot;: &quot;0.3.1&quot;,
      &quot;plugins&quot;: [
        {
          &quot;type&quot;: &quot;flannel&quot;,
          &quot;delegate&quot;: {
            &quot;hairpinMode&quot;: true,
            &quot;isDefaultGateway&quot;: true
          }
        },
        {
          &quot;type&quot;: &quot;portmap&quot;,
          &quot;capabilities&quot;: {
            &quot;portMappings&quot;: true
          }
        }
      ]
    }</span>
  <span class="token key atrule">net-conf.json</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    {
      &quot;Network&quot;: &quot;10.244.0.0/16&quot;,
      &quot;Backend&quot;: {
        &quot;Type&quot;: &quot;vxlan&quot;
      }
    }</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel<span class="token punctuation">-</span>ds
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">tier</span><span class="token punctuation">:</span> node
    <span class="token key atrule">app</span><span class="token punctuation">:</span> flannel
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> flannel
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">tier</span><span class="token punctuation">:</span> node
        <span class="token key atrule">app</span><span class="token punctuation">:</span> flannel
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
        <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
            <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> kubernetes.io/os
                <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                <span class="token key atrule">values</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> linux
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">priorityClassName</span><span class="token punctuation">:</span> system<span class="token punctuation">-</span>node<span class="token punctuation">-</span>critical
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
        <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> flannel
      <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> install<span class="token punctuation">-</span>cni<span class="token punctuation">-</span>plugin
        <span class="token comment">#image: docker.io/flannel/flannel-cni-plugin:v1.2.0</span>
        <span class="token comment">#image: flannelcni/flannel-cni-plugin:v1.1.0 for ppc64le and mips64le (dockerhub limitations may apply)</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/rancher/mirrored<span class="token punctuation">-</span>flannelcni<span class="token punctuation">-</span>flannel<span class="token punctuation">-</span>cni<span class="token punctuation">-</span>plugin<span class="token punctuation">:</span>v1.1.0
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> cp
        <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span>f
        <span class="token punctuation">-</span> /flannel
        <span class="token punctuation">-</span> /opt/cni/bin/flannel
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> cni<span class="token punctuation">-</span>plugin
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /opt/cni/bin
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> install<span class="token punctuation">-</span>cni
        <span class="token comment">#image: docker.io/flannel/flannel:v0.22.1</span>
        <span class="token comment">#image: flannelcni/flannel:v0.20.2 for ppc64le and mips64le (dockerhub limitations may apply)</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/rancher/mirrored<span class="token punctuation">-</span>flannelcni<span class="token punctuation">-</span>flannel<span class="token punctuation">:</span>v0.20.2
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> cp
        <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span>f
        <span class="token punctuation">-</span> /etc/kube<span class="token punctuation">-</span>flannel/cni<span class="token punctuation">-</span>conf.json
        <span class="token punctuation">-</span> /etc/cni/net.d/10<span class="token punctuation">-</span>flannel.conflist
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> cni
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/cni/net.d
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel<span class="token punctuation">-</span>cfg
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/kube<span class="token punctuation">-</span>flannel/
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel
        <span class="token comment">#image: docker.io/flannel/flannel:v0.22.1</span>
        <span class="token comment">#image: flannelcni/flannel:v0.20.2 for ppc64le and mips64le (dockerhub limitations may apply)</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/rancher/mirrored<span class="token punctuation">-</span>flannelcni<span class="token punctuation">-</span>flannel<span class="token punctuation">:</span>v0.20.2
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> /opt/bin/flanneld
        <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>ip<span class="token punctuation">-</span>masq
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kube<span class="token punctuation">-</span>subnet<span class="token punctuation">-</span>mgr
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&quot;100m&quot;</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;50Mi&quot;</span>
        <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
          <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
          <span class="token key atrule">capabilities</span><span class="token punctuation">:</span>
            <span class="token key atrule">add</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;NET_ADMIN&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;NET_RAW&quot;</span><span class="token punctuation">]</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> POD_NAME
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">fieldRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">fieldPath</span><span class="token punctuation">:</span> metadata.name
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> POD_NAMESPACE
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">fieldRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">fieldPath</span><span class="token punctuation">:</span> metadata.namespace
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> EVENT_QUEUE_DEPTH
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;5000&quot;</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> run
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /run/flannel
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel<span class="token punctuation">-</span>cfg
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/kube<span class="token punctuation">-</span>flannel/
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xtables<span class="token punctuation">-</span>lock
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /run/xtables.lock
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> run
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /run/flannel
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> cni<span class="token punctuation">-</span>plugin
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/cni/bin
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> cni
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /etc/cni/net.d
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> flannel<span class="token punctuation">-</span>cfg
        <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel<span class="token punctuation">-</span>cfg
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xtables<span class="token punctuation">-</span>lock
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /run/xtables.lock
          <span class="token key atrule">type</span><span class="token punctuation">:</span> FileOrCreate
</code></pre></div><blockquote><p>修改hosts文件<code>C:\\Windows\\System32\\drivers\\etc\\hosts</code>，添加 <code>199.232.68.133 raw.githubusercontent.com</code>，然后访问地址下载：https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml</p></blockquote><h4 id="_14-查看集群状态" tabindex="-1"><a class="header-anchor" href="#_14-查看集群状态" aria-hidden="true">#</a> 14 查看集群状态</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看集群节点状态 全部为 Ready 代表集群搭建成功</span>
kubectl get nodes

<span class="token comment"># 查看集群系统 pod 运行情况，下面所有 pod 状态为 Running 代表集群可用</span>
kubectl get pod <span class="token parameter variable">-A</span>
</code></pre></div><h2 id="第三章-pod-container" tabindex="-1"><a class="header-anchor" href="#第三章-pod-container" aria-hidden="true">#</a> 第三章 Pod &amp; Container</h2><ul><li>什么是 Pod</li><li>Pod 基本操作</li><li>Pod 的 Labels</li><li>Pod 的 生命周期</li><li>Container 特性</li><li>Pod 的资源限制</li><li>Pod 中 Init 容器</li><li>节点亲和性分配 Pod</li></ul><h3 id="_1-什么是pod" tabindex="-1"><a class="header-anchor" href="#_1-什么是pod" aria-hidden="true">#</a> 1 什么是Pod</h3><blockquote><p>摘取官网: https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/#working-with-pods</p></blockquote><h4 id="_1-1-简介" tabindex="-1"><a class="header-anchor" href="#_1-1-简介" aria-hidden="true">#</a> 1.1 简介</h4><p>Pod 是可以在 Kubernetes 中<strong>创建和管理的、最小的可部署的计算单元</strong>。<strong>Pod</strong>（就像在鲸鱼荚或者豌豆荚中）<strong>是一组（一个或多个）容器</strong>； 这些容器共享存储、网络、以及怎样运行这些容器的声明。 Pod 中的<strong>内容总是并置（colocated）的并且一同调度，在共享的上下文中运行</strong>。简言之如果用 Docker 的术语来描述，<strong>Pod 类似于共享名字空间并共享文件系统卷的一组容器</strong>。</p><p><code>定义: Pod 就是用来管理一组(一个|多个)容器的集合 特点: 共享网络 共享存储 共享上下文环境</code></p><h4 id="_1-2-pod-怎样管理多个容器" tabindex="-1"><a class="header-anchor" href="#_1-2-pod-怎样管理多个容器" aria-hidden="true">#</a> 1.2 Pod 怎样管理多个容器？</h4><p>Pod 中的容器被自动安排到集群中的同一物理机或虚拟机上，并可以一起进行调度。容器之间可以共享资源和依赖、彼此通信、协调何时以及何种方式终止自身。例如，你可能有一个容器，为共享卷中的文件提供 Web 服务器支持，以及一个单独的 &quot;边车 (sidercar)&quot; 容器负责从远端更新这些文件，如下图所示：</p><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/9141d0a0dbcae4a8e82cf0c517b09086.png" alt="img"></p><h4 id="_1-3-如何使用-pod" tabindex="-1"><a class="header-anchor" href="#_1-3-如何使用-pod" aria-hidden="true">#</a> 1.3 如何使用 Pod?</h4><p>通常你不需要直接创建 Pod，甚至单实例 Pod。相反，你会使用诸如 Deployment 或 Job 这类工作负载资源来创建 Pod。如果 Pod 需要跟踪状态，可以考虑 StatefulSet 资源。</p><p>Kubernetes 集群中的 Pod 主要有两种用法：</p><ul><li><strong>运行单个容器的Pod。</strong>&quot;每个 Pod 一个容器&quot; 模型是最常见的 Kubernetes 用例；在这种情况下，可以将 Pod 看作单个容器的包装器，并且 Kubernetes 直接管理 Pod，而不是容器。</li><li><strong>运行多个协同工作的容器的 Pod。</strong> Pod 可能封装由多个紧密耦合且需要共享资源的共处容器组成的应用程序。这些位于同一位置的容器可能形成单个内聚的服务单元 一一 一个容器将文件从共享卷提供给公众，而另一个单独的 ”边车“ (sidecar) 容器则刷新或更新这些文件。Pod 将这些容器和存储资源打包为一个可管理的实体。</li></ul><p><strong>说明：</strong></p><ul><li>将多个并置、同管的容器组织到一个 Pod 中是一种相对高级的使用场景。只有在一些场景中，容器之间紧密关联时你才应该使用这种模式。</li><li>每个 Pod 都旨在运行给定应用程序的单个实例。如果希望横向扩展应用程序（例如，运行多个实例以提供更多的资源），则应该使用多个 Pod，每个实例使用一个 Pod。在 Kubernetes 中，这通常被称为<strong>副本（Replication）</strong>。通常使用一种工作负载资源及其控制器来创建和管理一组 Pod 副本。</li></ul><h3 id="_2-pod-基本操作" tabindex="-1"><a class="header-anchor" href="#_2-pod-基本操作" aria-hidden="true">#</a> 2 Pod 基本操作</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看默认命名空间的 pod</span>
<span class="token comment"># kubectl get [pods|pod|po 必选]</span>
kubectl get pods

<span class="token comment"># 查看所有命名空间的 pod</span>
kubectl get pods <span class="token parameter variable">-A</span>
<span class="token comment"># kubectl get pods -n [命名空间名称 default]</span>
kubectl get pods <span class="token parameter variable">-n</span> default

<span class="token comment"># 查看默认命名空间下 pod 的详细信息</span>
kubectl get pods <span class="token parameter variable">-o</span> wide

<span class="token comment"># 查看所有命名空间下pod的详细信息</span>
kubectl get pods <span class="token parameter variable">-o</span> wide <span class="token parameter variable">-A</span>

<span class="token comment"># 实时监控 pod 的状态</span>
kubectl get pods <span class="token parameter variable">-w</span>
</code></pre></div><h4 id="_2-2-创建-pod" tabindex="-1"><a class="header-anchor" href="#_2-2-创建-pod" aria-hidden="true">#</a> 2.2 创建 pod</h4><blockquote><p>官方参考地址：https://kubernetes.io/zh-cn/docs/reference/kubernetes-api/workload-resources/pod-v1/</p></blockquote><p><strong>命令行创建</strong></p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 命令行创建 pod</span>
<span class="token comment"># kubectl run [pod名称 nginx] --image=nginx:1.19</span>
kubectl run nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:1.19

<span class="token comment"># 命令行创建 container</span>
<span class="token function">docker</span> run <span class="token parameter variable">-name</span> nginx nginx:1.19
</code></pre></div><p><strong>nginx-pod.yml</strong></p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># nginx-pod.yml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre></div><p><strong>使用 <code>nginx-pod.yml</code> 创建 Pod</strong></p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 kubectl apply/create -f 创建 pod</span>
kubectl create <span class="token parameter variable">-f</span> nginx-pod.yml
<span class="token comment"># 推荐使用 kubectl apply -f [文件名称 nginx-pod.yml]</span>
kubectl apply <span class="token parameter variable">-f</span> nginx-pod.yml
</code></pre></div><blockquote><p><code>注意：create仅仅是不存在时创建，如果已经存在则报错！apply不存在创建，存在更新配置。推荐使用apply！</code></p></blockquote><h4 id="_2-3-删除-pod" tabindex="-1"><a class="header-anchor" href="#_2-3-删除-pod" aria-hidden="true">#</a> 2.3 删除 pod</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl delete <span class="token parameter variable">-f</span> pod.yml
</code></pre></div><h4 id="_2-4-进入-pod-中容器" tabindex="-1"><a class="header-anchor" href="#_2-4-进入-pod-中容器" aria-hidden="true">#</a> 2.4 进入 pod 中容器</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 注意: 这种方式进入容器默认只会进入 pod 中第一个容器</span>
<span class="token comment"># kubectl exec -it [pod名称 nginx] [-- 必选] [执行命令 bash]</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> nginx -- <span class="token function">bash</span>
<span class="token comment"># 注意: 进入指定 pod 中指定容器</span>
<span class="token comment"># kubectl exec -it [pod名称 nginx] -c [容器名称 nginx] -- [执行命令 bash]</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> nginx <span class="token parameter variable">-c</span> nginx -- <span class="token function">bash</span>
</code></pre></div><h4 id="_2-5-查看-pod-日志" tabindex="-1"><a class="header-anchor" href="#_2-5-查看-pod-日志" aria-hidden="true">#</a> 2.5 查看 pod 日志</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 注意: 查看 pod 中第一个容器日志</span>
<span class="token comment"># kubectl logs [-f 可选,实时] [pod名称 nginx]</span>
kubectl logs <span class="token parameter variable">-f</span> nginx
<span class="token comment"># 注意: 查看 pod 中指定容器的日志</span>
<span class="token comment"># kubectl logs [-f 可选,实时] [pod名称 nginx] -c [容器名称 nginx]</span>
kubectl logs <span class="token parameter variable">-f</span> nginx <span class="token parameter variable">-c</span> nginx
</code></pre></div><h4 id="_2-6-查看-pod-描述信息" tabindex="-1"><a class="header-anchor" href="#_2-6-查看-pod-描述信息" aria-hidden="true">#</a> 2.6 查看 pod 描述信息</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl describe pod [pod名称 nginx]</span>
kubectl describe pod nginx
</code></pre></div><h3 id="_3-pod-运行多个容器" tabindex="-1"><a class="header-anchor" href="#_3-pod-运行多个容器" aria-hidden="true">#</a> 3 Pod 运行多个容器</h3><h4 id="_3-1-创建-pod" tabindex="-1"><a class="header-anchor" href="#_3-1-创建-pod" aria-hidden="true">#</a> 3.1 创建 pod</h4><p><strong>myapp-pod.yml</strong></p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># myapp-pod.yml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
      <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>5.0.10
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
</code></pre></div><p><strong>创建 myapp-pod.yml</strong></p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> myapp-pod.yml
</code></pre></div><h4 id="_3-2-查看指定容器日志" tabindex="-1"><a class="header-anchor" href="#_3-2-查看指定容器日志" aria-hidden="true">#</a> 3.2 查看指定容器日志</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看日志（默认只查看第一个容器日志，这里是展示 nginx 日志）</span>
kubectl logs <span class="token parameter variable">-f</span> myapp

<span class="token comment"># 查看 pod 中指定容器的日志</span>
<span class="token comment"># kubectl logs -f myapp -c [容器名称 nginx|redis]</span>
kubectl logs <span class="token parameter variable">-f</span> myapp <span class="token parameter variable">-c</span> nginx
kubectl logs <span class="token parameter variable">-f</span> myapp <span class="token parameter variable">-c</span> redis
</code></pre></div><h3 id="_4-pod-的-labels-标签" tabindex="-1"><a class="header-anchor" href="#_4-pod-的-labels-标签" aria-hidden="true">#</a> 4 Pod 的 Labels(标签)</h3><p><code>标签(Labels)</code> 是附加到 Kubernetes 对象 (比如 Pod) 上的键值对。标签旨在用于指定对用户有意义且相关的对象的标识属性。标签可以在创建时附加到对象，随后可以随时添加和修改。每个对象都可以定义一组键(key)/值(value)标签，但是每个键(key)对于给定对象必须是唯一的。</p><p>标签作用：就是用来给 k8s 中对象起别名，有了别名可以过滤和筛选</p><h4 id="_4-1-语法" tabindex="-1"><a class="header-anchor" href="#_4-1-语法" aria-hidden="true">#</a> 4.1 语法</h4><p><code>标签由键值对组成</code>，其有效标签值：</p><ul><li>必须为 63 个字符或更少（可以为空）</li><li>除非标签值为空必须以字母数字字符（<code>[a-z0-9A-Z]</code>）开头和结尾</li><li>包含破折号（<code>-</code>）、下划线（<code>_</code>）、点（<code>.</code>）和字母或数字</li></ul><h4 id="_4-2-示例" tabindex="-1"><a class="header-anchor" href="#_4-2-示例" aria-hidden="true">#</a> 4.2 示例</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp  <span class="token comment"># 创建时添加</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.21</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
      <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>5.0.10
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
</code></pre></div><h4 id="_4-3-标签基本操作" tabindex="-1"><a class="header-anchor" href="#_4-3-标签基本操作" aria-hidden="true">#</a> 4.3 标签基本操作</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看标签</span>
kubectl get pods --show-labels

<span class="token comment"># kubectl label pod [pod名称 myapp] [标签键值对 env=prod]</span>
kubectl label pod myapp <span class="token assign-left variable">env</span><span class="token operator">=</span>prod

<span class="token comment"># 覆盖标签 --overwrite</span>
kubectl label <span class="token parameter variable">--overwrite</span> pod myapp <span class="token assign-left variable">env</span><span class="token operator">=</span>test

<span class="token comment"># 删除标签 -号代表删除标签</span>
kubectl label pod myapp env-

<span class="token comment"># 根据标签筛选 env=test/env</span>
kubectl get po <span class="token parameter variable">-l</span> <span class="token assign-left variable">env</span><span class="token operator">=</span>test
kubectl get po <span class="token parameter variable">-1</span> <span class="token function">env</span>
kubectl get po <span class="token parameter variable">-l</span> <span class="token string">&#39;!env&#39;</span>  <span class="token comment"># 不包含的 pod</span>
kubectl get po <span class="token parameter variable">-l</span> <span class="token string">&#39;env in（test,prod)&#39;</span>  <span class="token comment"># 选择含有指定值的 pod</span>
kubectl get po <span class="token parameter variable">-l</span> <span class="token string">&#39;env notin (test,prod)&#39;</span>  <span class="token comment"># 选择不含有指定值的 pod</span>
</code></pre></div><h3 id="_5-pod-的生命周期" tabindex="-1"><a class="header-anchor" href="#_5-pod-的生命周期" aria-hidden="true">#</a> 5 Pod 的生命周期</h3><blockquote><p>摘自官网：https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/</p></blockquote><p>Pod 遵循预定义的生命周期，起始于 <code>Pending</code> 阶段， 如果至少其中有一个主要容器正常启动，则进入 <code>Running</code>，之后取决于 Pod 中是否有容器以失败状态结束而进入 <code>Succeeded</code> 或者 <code>Failed</code> 阶段。与此同时 Pod 在其生命周期中只会被调度一次。 一旦 Pod 被调度（分派）到某个节点，Pod 会一直在该节点运行，直到 Pod 停止或者被终止。</p><h4 id="_5-1-生命周期" tabindex="-1"><a class="header-anchor" href="#_5-1-生命周期" aria-hidden="true">#</a> 5.1 生命周期</h4><p>和一个个独立的应用容器一样，Pod 也被认为是相对临时性（而不是长期存在）的实体。 Pod 会被创建、赋予一个唯一的 ID（UID）， 并被调度到节点，并在终止（根据重启策略）或删除之前一直运行在该节点。如果一个节点死掉了，调度到该节点的 Pod 也被计划在给定超时期限结束后删除。</p><p>Pod 自身不具有自愈能力。如果 Pod 被调度到某节点而该节点之后失效， Pod 会被删除；类似地，Pod 无法在因节点资源耗尽或者节点维护而被驱逐期间继续存活。 Kubernetes 使用一种高级抽象来管理这些相对而言可随时丢弃的 Pod 实例， 称作控制器。</p><p>任何给定的 Pod （由 UID 定义）从不会被“重新调度（rescheduled）”到不同的节点； 相反，这一 Pod 可以被一个新的、几乎完全相同的 Pod 替换掉。 如果需要，新 Pod 的名字可以不变，但是其 UID 会不同。</p><p>如果某物声称其生命期与某 Pod 相同，例如存储卷， 这就意味着该对象在此 Pod （UID 亦相同）存在期间也一直存在。 如果 Pod 因为任何原因被删除，甚至某完全相同的替代 Pod 被创建时， 这个相关的对象（例如这里的卷）也会被删除并重建。</p><h4 id="_5-2-pod-阶段" tabindex="-1"><a class="header-anchor" href="#_5-2-pod-阶段" aria-hidden="true">#</a> 5.2 pod 阶段</h4><p>Pod 阶段的数量和含义是严格定义的。 除了本文档中列举的内容外，不应该再假定 Pod 有其他的 <code>phase</code> 值。</p><table><thead><tr><th>取值</th><th>描述</th></tr></thead><tbody><tr><td><code>Pending</code>（悬决）</td><td>Pod 已被 Kubernetes 系统接受，但有一个或者多个容器尚未创建亦未运行。此阶段包括等待 Pod 被调度的时间和通过网络下载镜像的时间。</td></tr><tr><td><code>Running</code>（运行中）</td><td>Pod 已经绑定到了某个节点，Pod 中所有的容器都已被创建。至少有一个容器仍在运行，或者正处于启动或重启状态。</td></tr><tr><td><code>Succeeded </code>（成功）</td><td>Pod 中的所有容器都已成功终止，并且不会再重启。</td></tr><tr><td><code>Failed</code> （失败）</td><td>Pod 中的所有容器都已终止，并且至少有一个容器是因为失败终止。也就是说，容器以非 0 状态退出或者被系统终止。</td></tr><tr><td><code>Unknown</code>（未知）</td><td>因为某些原因无法取得 Pod 的状态。这种情况通常是因为与 Pod 所在主机通信失败。</td></tr></tbody></table><blockquote><p><strong>说明：</strong></p><ol><li>当一个 Pod 被删除时，执行一些 kubectl 命令会展示这个 Pod 的状态为 <code>Terminating</code>（终止）。这个 <code>Terminating</code> 状态并不是 Pod 阶段之一。Pod 被赋予一个可以体面终止的期限，默认为 30 秒。你可以使用 <code>--force</code> 参数来强制终止 Pod。</li><li>如果某节点死掉或者与集群中其他节点失联，Kubernetes 会实施一种策略，将失去的节点上运行的所有 Pod 的 <code>phase</code> 设置为 <code>Failed</code>。</li></ol></blockquote><h3 id="_6-contrainer-特性" tabindex="-1"><a class="header-anchor" href="#_6-contrainer-特性" aria-hidden="true">#</a> 6 Contrainer 特性</h3><h4 id="_6-1-容器生命周期" tabindex="-1"><a class="header-anchor" href="#_6-1-容器生命周期" aria-hidden="true">#</a> 6.1 容器生命周期</h4><p>Kubernetes 会跟踪 Pod 中每个容器的状态，就像它跟踪 Pod 总体上的阶段一样。 你可以使用容器生命周期回调 来在容器生命周期中的特定时间点触发事件。</p><p>一旦调度器将 Pod 分派给某个节点，<code>kubelet</code> 就通过容器运行时开始为 Pod 创建容器。容器的状态有三种：<code>Waiting</code>（等待）、<code>Running</code>（运行中）和 <code>Terminated</code>（已终止）。</p><p>要检查 Pod 中容器的状态，你可以使用 <code>kubectl describe pod &lt;pod 名称&gt;</code>。 其输出中包含 Pod 中每个容器的状态。</p><p>每种状态都有特定的含义：</p><ul><li><code>Waiting</code> （等待）</li></ul><p>如果容器并不处在 <code>Running</code> 或 <code>Terminated</code> 状态之一，它就处在 <code>Waiting</code> 状态。 处于 <code>Waiting</code> 状态的容器仍在运行它完成启动所需要的操作：例如， 从某个容器镜像仓库拉取容器镜像，或者向容器应用 Secret 数据等等。 当你使用 <code>kubectl</code> 来查询包含 <code>Waiting</code> 状态的容器的 Pod 时，你也会看到一个 Reason 字段，其中给出了容器处于等待状态的原因。</p><ul><li><code>Running</code>（运行中）</li></ul><p><code>Running</code> 状态表明容器正在执行状态并且没有问题发生。 如果配置了 <code>postStart</code> 回调，那么该回调已经执行且已完成。 如果你使用 <code>kubectl</code> 来查询包含 <code>Running</code> 状态的容器的 Pod 时， 你也会看到关于容器进入 <code>Running</code> 状态的信息。</p><ul><li><code>Terminated</code>（已终止）</li></ul><p>处于 <code>Terminated</code> 状态的容器已经开始执行并且或者正常结束或者因为某些原因失败。 如果你使用 <code>kubectl</code> 来查询包含 <code>Terminated</code> 状态的容器的 Pod 时， 你会看到容器进入此状态的原因、退出代码以及容器执行期间的起止时间。</p><p>如果容器配置了 <code>preStop</code> 回调，则该回调会在容器进入 <code>Terminated</code> 状态之前执行。</p><h4 id="_6-2-容器生命周期回调" tabindex="-1"><a class="header-anchor" href="#_6-2-容器生命周期回调" aria-hidden="true">#</a> 6.2 容器生命周期回调</h4><p>类似于许多具有生命周期回调组件的编程语言框架，例如 Angular、Vue、Kubernetes 为容器提供了生命周期回调。回调使容器能够了解其管理生命周期中的事件，并在执行相应的生命周期回调时运行在处理程序中实现的代码。</p><p>有两个回调暴露给容器：</p><ul><li><code>PostStart</code> 这个回调在容器被创建之后立即被执行。但是，不能保证回调会在容器入口点（ENTRYPOINT）之前执行。没有参数传递给处理程序。</li><li><code>PreStop</code> 在容器因 API 请求或者管理事件（诸如存活态探针、启动探针失败、资源抢占、资源竞争等）而被终止之前，此回调会被调用。如果容器已经处于已终止或者已完成状态，则对 <code>PreStop</code> 回调的调用将失败。在用来停止容器的 TERM 信号被发出之前，回调必须执行结束。Pod 的终止宽限周期在 <code>PreStop</code> 回调被执行之前即开始计数，所以无论回调函数的执行结果如何，容器最终都会在 Pod 的终止宽限期内被终止。没有参数会被传递给处理程序。</li><li><strong>使用容器生命周期回调</strong></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># nginx-pod.yml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
        <span class="token key atrule">postStart</span><span class="token punctuation">:</span>  <span class="token comment"># 容器创建过程中执行 </span>
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;echo postStart &gt;&gt; /start.txt&quot;</span><span class="token punctuation">]</span>
        <span class="token key atrule">preStop</span><span class="token punctuation">:</span>  <span class="token comment"># 容器终止之前执行</span>
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;echo preStop &gt;&gt; /stop.txt &amp;&amp; sleep 5&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre></div><h4 id="_6-3-容器重启策略" tabindex="-1"><a class="header-anchor" href="#_6-3-容器重启策略" aria-hidden="true">#</a> 6.3 容器重启策略</h4><p>Pod 的 <code>spec</code> 中包含一个 <code>restartPolicy</code> 字段，其可能取值包括 <code>Always(总是重启)、OnFailure(容器异常退出状态码非 0,重启) 和 Never</code>。默认值是 <code>Always</code>。</p><p><code>restartPolicy</code> 适用于 Pod 中的所有容器。<code>restartPolicy</code> 仅针对同一节点上 <code>kubelet</code> 的容器重启动作。当 Pod 中的容器退出时，<code>kubelet</code> 会按指数回退方式计算重启的延迟(10s、20s、40s、...)，其最长延迟为 5 分钟。一旦某容器执行了 10 分钟并且没有出现问题，<code>kubelet</code> 对该容器的重启回退计时器执行重置操作。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always  <span class="token comment"># OnFailure Never</span>
</code></pre></div><h4 id="_6-4-自定义容器启动命令" tabindex="-1"><a class="header-anchor" href="#_6-4-自定义容器启动命令" aria-hidden="true">#</a> 6.4 自定义容器启动命令</h4><p>和 Docker 容器一样，k8s中容器也可以通过 command、args 用来修改容器启动默认执行命令以及传递相关参数。<strong>但一般推荐使用 command 修改启动命令，使用 args 为启动命令传递参数。</strong></p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
      <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>5.0.10
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;redis-server&quot;</span><span class="token punctuation">]</span>   <span class="token comment"># 用来指定启动命令</span>
      <span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;--appendonly yes&quot;</span><span class="token punctuation">]</span>  <span class="token comment"># 用来为启动命令传递参数</span>
      <span class="token comment">#args: [&quot;redis-server&quot;，&quot;--appendonly yes&quot;]  # 单独使用修改启动命令并传递参数</span>
      <span class="token comment">#args:                                      # 另一种语法格式</span>
      <span class="token comment">#  - redis-server</span>
      <span class="token comment">#  - &quot;--appendonly yes&quot;</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
</code></pre></div><h4 id="_6-5-容器探针" tabindex="-1"><a class="header-anchor" href="#_6-5-容器探针" aria-hidden="true">#</a> 6.5 容器探针</h4><p>probe 是由 kubelet 对容器执行的定期诊断。要执行诊断，kubelet 既可以在容器内执行代码，也可以发出一个网络请求。</p><p><strong>探测类型</strong></p><p>针对运行中的容器，<code>kubelet</code> 可以选择是否执行以下三种探针，以及如何针对探测结果作出反应：</p><ul><li><code>livenessProbe</code> <strong>指示容器是否正在运行</strong>。如果存活态探测失败，则 kubelet 会杀死容器，并且容器将根据其重启策略决定未来。如果容器不提供存活探针，则默认状态为 <code>Success</code>。</li><li><code>readinessProbe</code> <strong>指示容器是否准备好为请求提供服务</strong>。如果就绪态探测失败，端点控制器将从与 Pod 匹配的所有服务的端点列表中删除该 Pod 的 IP 地址。初始延迟之前的就绪态的状态值默认为 <code>Failure</code>。如果容器不提供就绪态探针，则默认状态为 <code>Success</code>。</li><li><code>startupProbe 1.7+</code> <strong>指示容器中的应用是否已经启动</strong>。如果提供了启动探针，则所有其他探针都会被禁用，直到此探针成功为止。如果启动探测失败，<code>kubelet</code> 将杀死容器，而容器依其重启策略进行重启。如果容器没有提供启动探测，则默认状态为 <code>Success</code>。</li></ul><p><strong>探针机制</strong></p><p>使用探针来检查容器有四种不同的方法。每个探针都必须准确定义为这四种机制中的一种：</p><ul><li><p><code>exec</code></p><p>在容器内执行指定命令。如果命令退出时返回码为 θ 则认为诊断成功。</p></li><li><p><code>grpc</code></p><p>使用 gRPC 执行一个远程过程调用。目标应该实现 gRPC 健康检查。如果响应的状态是 <code>&quot;SERVING&quot;</code>，则认为诊断成功。gRPC 探针是一个 Alpha 特性，只有在你启用了 <code>&quot;GRPCContainerProbe&quot;</code> 特性门控时才能使用。</p></li><li><p><code>httpGet</code></p><p>对容器的 IP 地址上指定端口和路径执行 HTTP <code>GET</code> 请求。如果响应的状态码大于等于 200 且小于 400，则诊断被认为是成功的。</p></li><li><p><code>tcpSocket</code></p><p>对容器的 IP 地址上的指定端口执行 TCP 检查。如果端口打开，则诊断被认为是成功的。如果远程系统（容器）在打开连接后立即将其关闭，这算作是健康的。</p></li></ul><p><strong>探针结果</strong></p><p>每次探测都将获得以下三种结果之一：</p><ul><li><code>Success</code>（成功）容器通过了诊断。</li><li><code>Failure</code>（失败）容器未通过诊断。</li><li><code>Unknown</code>（未知）诊断失败，因此不会采取任何行动。</li></ul><p><strong>探针参数</strong></p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment"># 初始化时间5s</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">4</span>        <span class="token comment"># 检测间隔时间4s</span>
<span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span>       <span class="token comment"># 默认检测超时时间为1s</span>
<span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>     <span class="token comment"># 默认失败次数为3次，达到3次后重启pod</span>
<span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>     <span class="token comment"># 默认成功次数为1次，1次监测成功代表成功</span>
</code></pre></div><p><strong>使用探针</strong></p><ul><li><strong>exec</strong></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> liveness<span class="token punctuation">-</span>exec
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">exec</span><span class="token punctuation">:</span> exec
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> /bin/sh
        <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
        <span class="token punctuation">-</span> sleep7;nginx <span class="token punctuation">-</span>g &quot;daemon off;&quot;  <span class="token comment"># 这一步会和初始化同时开始运行，也就是在初始化5s后和7秒之间，会检测出一次失败，7秒后启动后检测正常，所以pod不会重启</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>  <span class="token comment"># 这里使用 exec 执行 shell 命令检测容器状态</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> ls
            <span class="token punctuation">-</span> /var/run/nginx.pid  <span class="token comment"># 查看是否有pid文件</span>
        <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>    <span class="token comment"># 初始化时间5s</span>
        <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">4</span>          <span class="token comment"># 检测间隔时间4s</span>
        <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span>         <span class="token comment"># 默认检测超时时间为1s</span>
        <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>       <span class="token comment"># 默认失败次数为3次，达到3次后重启pod</span>
        <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>       <span class="token comment"># 默认成功次数为1次，1次监测成功代表成功</span>
</code></pre></div><blockquote><p><strong>说明：</strong></p><ol><li>如果 sleep 7s，第一次检测发现失败，但是第二次检测发现成功后容器就一直处于健康状态不会重启。</li><li>如果 sleep 30s，第一次检测失败，超过3次检测同样失败，k8s 就会杀死容器进行重启，反复循环这个过程。</li></ol></blockquote><ul><li><strong>tcpSocket</strong></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> liveness<span class="token punctuation">-</span>tcpsocket
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">tcpsocket</span><span class="token punctuation">:</span> tcpsocket
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> /bin/sh
        <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
        <span class="token punctuation">-</span> sleep7;nginx <span class="token punctuation">-</span>g &quot;daemon off;&quot;  <span class="token comment"># 这一步会和初始化同时开始运行，也就是在初始化5s后和7秒之间，会检测出一次失败，7秒后启动后检测正常，所以pod不会重启</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
        <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
          <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment"># 初始化时间5s</span>
        <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">4</span>        <span class="token comment"># 检测间隔时间4s</span>
        <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span>       <span class="token comment"># 默认检测超时时间为1s</span>
        <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>     <span class="token comment"># 默认失败次数为3次，达到3次后重启pod</span>
        <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>     <span class="token comment"># 默认成功次数为1次，1次监测成功代表成功</span>
</code></pre></div><ul><li><strong>httpGet</strong></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># probe-liveness-httpget.yml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> liveness<span class="token punctuation">-</span>httpget
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">httpget</span><span class="token punctuation">:</span> httpget
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> /bin/sh
        <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
        <span class="token punctuation">-</span> sleep7;nginx <span class="token punctuation">-</span>g &quot;daemon off;&quot;  <span class="token comment"># 这一步会和初始化同时开始运行，也就是在初始化5s后和7秒之间，会检测出一次失败，7秒后启动后检测正常，所以pod不会重启</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
        <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>                <span class="token comment"># httpget</span>
          <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>              <span class="token comment"># 访问的端口</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /index.html     <span class="token comment"># 访问的路径</span>
        <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment"># 初始化时间5s</span>
        <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">4</span>        <span class="token comment"># 检测间隔时间4s</span>
        <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span>       <span class="token comment"># 默认检测超时时间为1s</span>
        <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>     <span class="token comment"># 默认失败次数为3次，达到3次后重启pod</span>
        <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span>     <span class="token comment"># 默认成功次数为1次，1次监测成功代表成功</span>
</code></pre></div><ul><li><p><strong>GRPC 探针</strong></p><blockquote><p>官方参考地址：https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/</p></blockquote></li></ul><h4 id="_6-6-资源限制" tabindex="-1"><a class="header-anchor" href="#_6-6-资源限制" aria-hidden="true">#</a> 6.6 资源限制</h4><p>在k8s中对于容器资源限制主要分为以下两类：</p><ul><li><p>内存资源限制：内存<strong>请求</strong>（request）和内存<strong>限制</strong>（Limit）分配给一个容器。我们保障容器拥有它请求数量的内存，但不允许使用超过限制数量的内存。</p><blockquote><p>官方参考地址：https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-memory-resource/</p></blockquote></li><li><p>CPU 资源限制：为容器设置 CPU <strong>request（请求）</strong> 和 CPU <strong>limit（限制）</strong>。容器使用的 CPU 不能超过所配置的限制。如果系统有空闲的 CPU 时间，则可以保证给容器分配其所请求数量的 CPU 资源。</p><blockquote><p>官网参考地址：https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-cpu-resource/</p></blockquote></li></ul><p>请求 request memory cpu: 可以使用的基础资源 100M</p><p>限制 limit memory cpu: 可以使用的最大资源 200M 超过最大资源之后容器会被kill，OOM 错误</p><h5 id="_1-metrics-server" tabindex="-1"><a class="header-anchor" href="#_1-metrics-server" aria-hidden="true">#</a> 1 metrics-server</h5><blockquote><p>官网地址：https://github.com/kubernetes-sigs/metrics-server</p></blockquote><p><strong>Kubernetes Metrics Server</strong>（Kubernetes指标服务器），它是一个<strong>可扩展的、高效的容器资源度量源</strong>。Metrics Server 用于监控每个 Node 和 Pod 的负载（用于Kubernetes内置自动扩缩管道）。Metrics Server 从 Kubelets 收集资源指标，并通过 Metrics API 在 Kubernetes apiserver 中公开，供 Horizontal Pod Autoscaler 和 Vertical Pod Autoscaler 使用。Metrics API 也可以通过 kubectl top 访问，使其更容易调试自动扩缩管道。</p><ul><li>查看 metrics-server（或者其他资源指标 API <code>metrics.k8s.io</code> 服务提供者）是否正在运行，请键入以下命令：</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get apisenvices
</code></pre></div><ul><li>如果资源指标 API 可用，则会输出将包含一个对 <code>metrics.k8s.io</code> 的引用。</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>NAME
v1beta1.metrics.k8s.io
</code></pre></div><ul><li>安装 metrics-server</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># components.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-admin</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-edit</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
    <span class="token key atrule">rbac.authorization.k8s.io/aggregate-to-view</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>aggregated<span class="token punctuation">-</span>metrics<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> metrics.k8s.io
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> pods
  <span class="token punctuation">-</span> nodes
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
  <span class="token punctuation">-</span> list
  <span class="token punctuation">-</span> watch
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;&quot;</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> nodes/metrics
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;&quot;</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> pods
  <span class="token punctuation">-</span> nodes
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
  <span class="token punctuation">-</span> list
  <span class="token punctuation">-</span> watch
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>reader
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> extension<span class="token punctuation">-</span>apiserver<span class="token punctuation">-</span>authentication<span class="token punctuation">-</span>reader
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>system<span class="token punctuation">:</span>auth<span class="token punctuation">-</span>delegator
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>auth<span class="token punctuation">-</span>delegator
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> system<span class="token punctuation">:</span>metrics<span class="token punctuation">-</span>server
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> https
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>cert<span class="token punctuation">-</span>dir=/tmp
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>secure<span class="token punctuation">-</span>port=4443
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>preferred<span class="token punctuation">-</span>address<span class="token punctuation">-</span>types=InternalIP<span class="token punctuation">,</span>ExternalIP<span class="token punctuation">,</span>Hostname
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>use<span class="token punctuation">-</span>node<span class="token punctuation">-</span>status<span class="token punctuation">-</span>port
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>metric<span class="token punctuation">-</span>resolution=15s
        <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>kubelet<span class="token punctuation">-</span>insecure<span class="token punctuation">-</span>tls  <span class="token comment"># 修改去掉证书验证</span>
        <span class="token comment">#image: registry.k8s.io/metrics-server/metrics-server:v0.6.4</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> dyrnq/metrics<span class="token punctuation">-</span>server<span class="token punctuation">:</span>v0.6.4  <span class="token comment"># 修改官方无法下载</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /livez
            <span class="token key atrule">port</span><span class="token punctuation">:</span> https
            <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">4443</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> https
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
        <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /readyz
            <span class="token key atrule">port</span><span class="token punctuation">:</span> https
            <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTPS
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
        <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
          <span class="token key atrule">allowPrivilegeEscalation</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
          <span class="token key atrule">readOnlyRootFilesystem</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">runAsNonRoot</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">runAsUser</span><span class="token punctuation">:</span> <span class="token number">1000</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /tmp
          <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>dir
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  <span class="token comment"># 必须指定这个才行</span>
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">kubernetes.io/os</span><span class="token punctuation">:</span> linux
      <span class="token key atrule">priorityClassName</span><span class="token punctuation">:</span> system<span class="token punctuation">-</span>cluster<span class="token punctuation">-</span>critical
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> tmp<span class="token punctuation">-</span>dir
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiregistration.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> APIService
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
  <span class="token key atrule">name</span><span class="token punctuation">:</span> v1beta1.metrics.k8s.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> metrics.k8s.io
  <span class="token key atrule">groupPriorityMinimum</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">insecureSkipTLSVerify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">versionPriority</span><span class="token punctuation">:</span> <span class="token number">100</span>
</code></pre></div><blockquote><p>文件来源：https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</p><p><strong>报错：</strong><code>Error from server (ServiceUnavailable): the server is currently unable to handle the request (get pods.metrics.k8s.io liveness-httpget)</code></p><p><strong>解决方法：</strong> 增加这个参数 <code>spec.template.spec.hostNetwork: true</code></p></blockquote><h5 id="_2-指定内存请求和限制" tabindex="-1"><a class="header-anchor" href="#_2-指定内存请求和限制" aria-hidden="true">#</a> 2 指定内存请求和限制</h5><blockquote><p>官网：https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-memory-resource/</p></blockquote><p>为容器指定内存请求，请在容器资源清单中包含 <code>resources: requests</code> 字段。同理，要指定内存限制，请包含 <code>resources: limits</code>。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># nginx-memory-demo.yaml</span>
<span class="token comment"># 内存资源的基本单位是字节（byte）。你可以使用这些后缀之一，将内存表示为纯整数或定点整数：E、P、T、G、M、K、Ei、Pi、Ti、Gi、Mi、Ki。例如，下面是一些近似相同的值：128974848，129e6，129M，123Mi</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>memory<span class="token punctuation">-</span>demo
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>memory<span class="token punctuation">-</span>demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>memory<span class="token punctuation">-</span>demo
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">requests</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;100Mi&quot;</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">&quot;200Mi&quot;</span>
</code></pre></div><ul><li><strong>查看容器内存使用情况</strong></li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get pod nginx-memory-demo <span class="token parameter variable">--output</span><span class="token operator">=</span>yaml
</code></pre></div><ul><li><strong>查看容器正在使用内存情况</strong></li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl <span class="token function">top</span> pod nginx-memory-demo
</code></pre></div><ul><li><p><strong>内存请求和限制的目的</strong></p><p>通过为集群中运行的容器配置内存请求和限制，你可以有效利用集群节点上可用的内存资源。通过将 Pod 的内存请求保持在较低水平，你可以更好地安排 Pod 调度。通过让内存限制大于内存请求，你可以完成两件事：</p><ul><li>Pod 可以进行一些突发活动，从而更好的利用可用内存。</li><li>Pod 在突发活动期间，可使用的内存被限制为合理的数量。</li></ul></li><li><p><strong>没有指定内存限制</strong></p><p>如果你没有为一个容器指定内存限制，则自动遵循以下情况之一：</p><ul><li>容器可无限制地使用内存。容器可以使用其所在节点所有的可用内存，进而可能导致该节点调用 <code>OOM Killer</code>。此外，如果发生 <code>OOM Killer</code>，没有资源限制的容器将被杀掉的可行性更大。</li><li>运行的容器所在命名空间有默认的内存限制，那么该容器会被自动分配默认限制。</li></ul></li></ul><h5 id="_3-指定-cpu-请求和限制" tabindex="-1"><a class="header-anchor" href="#_3-指定-cpu-请求和限制" aria-hidden="true">#</a> 3 指定 CPU 请求和限制</h5><blockquote><p>官网: https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-cpu-resource/</p></blockquote><p>为容器指定 CPU 请求，请在容器资源清单中包含 <code>resources：requests</code> 字段。要指定 CPU 限制，请包含 <code>resources: limits</code>。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># nginx-cpu-demo.yaml </span>
<span class="token comment"># CPU 资源以 CPU 单位度量。小数值是可以使用的。一个请求 0.5 CPU 的容器保证会获得请求 1 个 CPU 的容器的 CPU 的一半。你可以使用后缀 m 表示毫。例如 100m CPU、100 milliCPU 和 0.1 CPU 都相同。CPU 请求只能使用绝对数量，而不是相对数量。0.1 在单核、双核或 48 核计算机上的 CPU 数量值是一样的。</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>cpu<span class="token punctuation">-</span>demo
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>cpu<span class="token punctuation">-</span>demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>cpu<span class="token punctuation">-</span>demo
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span>
        <span class="token key atrule">requests</span><span class="token punctuation">:</span>
          <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&quot;0.5&quot;</span>
</code></pre></div><ul><li>显示 pod 详细信息</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get pod nginx-cpu-demo <span class="token parameter variable">--output</span><span class="token operator">=</span>yaml
</code></pre></div><ul><li>显示 pod 运行指标</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl <span class="token function">top</span> pod nginx-cpu-demo
</code></pre></div><ul><li><p><strong>CPU 请求和限制的初衷</strong></p><p>通过配置你的集群中运行的容器的 CPU 请求和限制，你可以有效利用集群上可用的 CPU 资源。通过将 Pod CPU 请求保持在较低水平，可以使 Pod 更有机会被调度。通过使 CPU 限制大于 CPU 请求，你可以完成两件事：</p><ul><li>Pod 可能会有突发性的活动，它可以利用碰巧可用的 CPU 资源。</li><li>Pod 在突发负载期间可以使用的 CPU 资源数量仍被限制为合理的数量。</li></ul></li><li><p><strong>如果不指定 CPU 限制</strong></p><p>如果你没有为容器指定 CPU 限制，则会发生以下情况之一：</p><ul><li>容器在可以使用的 CPU 资源上没有上限。因而可以使用所在节点上所有的可用 CPU 资源。</li><li>容器在具有默认 CPU 限制的名字空间中运行，系统会自动为容器设置默认限制。</li></ul></li><li><p><strong>如果你设置了 CPU 限制但未设置 CPU 请求</strong></p></li></ul><p>如果你为容器指定了 CPU 限制值但未为其设置 CPU 请求，Kubernetes 会自动为其 设置与 CPU 限制相同的 CPU 请求值。类似的，如果容器设置了内存限制值但未设置 内存请求值，Kubernetes 也会为其设置与内存限制值相同的内存请求。</p><h3 id="_7-pod-中-init-容器" tabindex="-1"><a class="header-anchor" href="#_7-pod-中-init-容器" aria-hidden="true">#</a> 7 Pod 中 init 容器</h3><p>Init 容器是一种特殊容器，在 Pod 内的应用容器启动之前运行。Init 容器可以包括一些应用镜像中不存在的实用工具和安装脚本。</p><h4 id="_7-1-init-容器特点" tabindex="-1"><a class="header-anchor" href="#_7-1-init-容器特点" aria-hidden="true">#</a> 7.1 init 容器特点</h4><p>init 容器与普通的容器非常像，除了如下几点：</p><ul><li>它们总是运行到完成。如果 Pod 的 Init 容器失败，kubelet 会不断地重启该 Init 容器直到该容器成功为止。然而，如果 Pod 对应的 <code>restartPolicy</code> 值为 &quot;Never&quot;，并且 Pod 的 Init 容器失败，则 Kubernetes 会将整个 Pod 状态设置为失败。</li><li>每个都必须在下一个启动之前成功完成。</li><li>同时 Init 容器不支持 <code>lifecycle</code>、<code>livenessProbe</code>、<code>readinessProbe</code> 和 <code>startupProbe</code>，因为它们必须在 Pod 就绪之前运行完成。</li><li>如果为一个 Pod 指定了多个 Init 容器，这些容器会按顺序逐个运行。每个 Init 容器必须运行成功，下一个才能够运行。当所有的 Init 容器运行完成时，Kubernetes 才会为 Pod 初始化应用容器并像平常一样运行。</li><li>Init 容器支持应用容器的全部字段和特性，包括资源限制、数据卷和安全设置。然而，Init 容器对资源请求和限制的处理稍有不同。</li></ul><h4 id="_7-2-使用-init-容器" tabindex="-1"><a class="header-anchor" href="#_7-2-使用-init-容器" aria-hidden="true">#</a> 7.2 使用 init 容器</h4><blockquote><p>官网地址: https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/init-containers/</p></blockquote><p>在 Pod 的规约中与用来描述应用容器的 <code>containers</code> 数组平行的位置指定 Init 容器。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>demo
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> MyApp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.28</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo The app is running! &amp;&amp; sleep 3600&#39;</span><span class="token punctuation">]</span>
  <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>myservice
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.28</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&quot;echo init-myservice is running &amp;&amp; sleep 5&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>mydb
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.28</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&quot;echo init-mydb is running &amp;&amp; sleep 10&quot;</span><span class="token punctuation">]</span>
</code></pre></div><ul><li>查看启动详细</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl describe pod init-demo
</code></pre></div><h3 id="_8-节点亲和性分配-pod" tabindex="-1"><a class="header-anchor" href="#_8-节点亲和性分配-pod" aria-hidden="true">#</a> 8 节点亲和性分配 Pod</h3><blockquote><p>官方地址：http://kubernetes.p2hp.com/docs/concepts/scheduling-eviction/assign-pod-node.html</p></blockquote><p>你可以约束一个 Pod 以便 <strong>限制</strong> 其只能在特定的节点上运行，或优先在特定的节点上运行。有几种方法可以实现这点，推荐的方法都是用 <strong>标签选择算符</strong> 来进行选择。通常这样的约束不是必须的，因为调度器将自动进行合理的放置（比如，将 Pod 分散到节点上，而不是将 Pod 放置在可用资源不足的节点上等等）。但在某些情况下，你可能需要进一步控制 Pod 被部署到哪个节点。例如，确保 Pod 最终落在连接了 SSD 的机器上，或者将来自两个不同的服务且有大量通信的 Pods 被放置在同一个可用区。</p><p>你可以使用下列方法中的任何一种来选择 Kubernetes 对特定 Pod 的调度：</p><ul><li>与节点标签匹配的 nodeSelector <strong>推荐</strong></li><li>亲和性与反亲和性 <strong>推荐</strong></li><li>nodeName</li><li>Pod 拓扑分布约束 <strong>推荐</strong></li></ul><blockquote><p><strong>定义：使用节点亲和性可以把 Kubernetes Pod 分配到特定节点。</strong></p></blockquote><h4 id="_8-1-给节点添加标签" tabindex="-1"><a class="header-anchor" href="#_8-1-给节点添加标签" aria-hidden="true">#</a> 8.1 给节点添加标签</h4><ul><li>列出集群中的节点及其标签：</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get nodes --show-labels
<span class="token comment"># 输出类似于此:</span>
</code></pre></div><ul><li>选择一个节点，给它添加一个标签：</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl label nodes &lt;节点名称&gt; &lt;标签=值 disktype=ssd&gt;</span>
kubectl label nodes k8s-node1 <span class="token assign-left variable">disktype</span><span class="token operator">=</span>ssd
</code></pre></div><ul><li>验证你所选节点具有 <code>disktype=ssd</code> 标签：</li></ul><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl get nodes --show-labels
<span class="token comment"># 输出类似于此:</span>
</code></pre></div><h4 id="_8-2-根据选择节点标签指派-pod-到指定节点-nodeselector" tabindex="-1"><a class="header-anchor" href="#_8-2-根据选择节点标签指派-pod-到指定节点-nodeselector" aria-hidden="true">#</a> 8.2 根据选择节点标签指派 pod 到指定节点[nodeSelector]</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
    <span class="token key atrule">disktype</span><span class="token punctuation">:</span> ssd  <span class="token comment"># 选择节点为标签为 ssd 的节点</span>
</code></pre></div><h4 id="_8-3-根据节点名称指派-pod-到指定节点-nodename" tabindex="-1"><a class="header-anchor" href="#_8-3-根据节点名称指派-pod-到指定节点-nodename" aria-hidden="true">#</a> 8.3 根据节点名称指派 pod 到指定节点[nodeName]</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">nodeName</span><span class="token punctuation">:</span> worker1  <span class="token comment"># 调度 Pod 到特定的节点</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
</code></pre></div><h4 id="_8-4-根据亲和性和反亲和性指派-pod-到指定节点" tabindex="-1"><a class="header-anchor" href="#_8-4-根据亲和性和反亲和性指派-pod-到指定节点" aria-hidden="true">#</a> 8.4 根据亲和性和反亲和性指派 pod 到指定节点</h4><blockquote><p>官网地址：http://kubernetes.p2hp.com/docs/concepts/scheduling-eviction/assign-pod-node.html</p></blockquote><p><strong>说明</strong></p><p><code>nodeSelector</code> 提供了一种最简单的方法来将Pod约束到具有特定标签的节点上。亲和性和反亲和性扩展了你可以定义的约束类型。使用亲和性与反亲和性的一些好处有：</p><ul><li>亲和性、反亲和性语言的表达能力更强。<code>nodeSelector</code> 只能选择拥有所有指定标签的节点。亲和性、反亲和性为你提供对选择逻辑的更强控制能力。</li><li>你可以标明某规则是“软需求”或者“偏好”，这样调度器在无法找到匹配节点时仍然调度该 Pod。</li><li>你可以使用节点上（或其他拓扑域中）运行的其他 Pod 的标签来实施调度约束，而不是只能使用节点本身的标签。这个能力让你能够定义规则允许哪些 Pod 可以被放置在一起。</li></ul><p><strong>亲和性功能由两种类型的亲和性组成：</strong></p><ul><li><strong>节点亲和性</strong>功能类似于 <code>nodeSelector</code> 字段，但它的表达能力更强，并且允许你指定软规则。</li><li>Pod 间亲和性/反亲和性允许你根据其他 Pod 的标签来约束 Pod。</li></ul><p>节点亲和性概念上类似于 <code>nodeSelector</code>，它使你可以根据节点上的标签来约束 Pod 可以调度到哪些节点上。节点亲和性有两种：</p><ul><li><code>requiredDuringSchedulingIgnoredDuringExecution</code>：调度器只有在规则被满足的时候才能执行调度。此功能类似于 <code>nodeSelector</code>，但其语法表达能力更强。</li><li><code>preferredDuringSchedulingIgnoredDuringExecution</code>：调度器会尝试寻找满足对应规则的节点。如果找不到匹配的节点，调度器仍然会调度该 Pod。</li></ul><p><strong>注意：在上述类型中，<code>IgnoredDuringExecution</code> 意味着如果节点标签在 Kubernetes 调度 Pod 后发生了变更，Pod 仍将继续运行。</strong></p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> with<span class="token punctuation">-</span>node<span class="token punctuation">-</span>affinity
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
    <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
      <span class="token comment"># 节点必须包含一个键名为 ssd 的标签，并且该标签的取值必须为 fast 或 superfast。</span>
      <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
        <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> ssd
            <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
            <span class="token key atrule">values</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> fast
            <span class="token punctuation">-</span> superfast
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
</code></pre></div><p><strong>注意：你可以使用 <code>In</code>、<code>NotIn</code>、<code>Exists</code>、<code>DoesNotExist</code>、<code>Gt</code> 和 <code>Lt</code> 之一作为操作符。<code>NotIn</code> 和 <code>DoesNotExist</code> 可用来实现节点反亲和性行为。</strong></p><h4 id="_8-5-节点亲和性权重" tabindex="-1"><a class="header-anchor" href="#_8-5-节点亲和性权重" aria-hidden="true">#</a> 8.5 节点亲和性权重</h4><p>你可以为 <code>preferredDuringSchedulingIgnoredDuringExecution</code> 亲和性类型的每个实例设置 <code>weight</code> 字段，其取值范围是 1 到 100。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> with<span class="token punctuation">-</span>node<span class="token punctuation">-</span>affinity
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
    <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
      <span class="token comment"># 节点最好具有一个键名为 app 且取值为 fast 的标签。</span>
      <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>  <span class="token comment"># 取值范围是 1 到 100</span>
        <span class="token key atrule">preference</span><span class="token punctuation">:</span>
          <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> ssd
            <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
            <span class="token key atrule">values</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> fast
      <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">50</span>
        <span class="token key atrule">preference</span><span class="token punctuation">:</span>
          <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> app
              <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
              <span class="token key atrule">values</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> demo
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
</code></pre></div><h4 id="_8-6-pod-间亲和性和反亲和性及权重" tabindex="-1"><a class="header-anchor" href="#_8-6-pod-间亲和性和反亲和性及权重" aria-hidden="true">#</a> 8.6 pod 间亲和性和反亲和性及权重</h4><p>与节点亲和性类似，Pod 的亲和性与反亲和性也有两种类型：</p><ul><li><code>requiredDuringSchedulingIgnoredDuringExecution</code></li><li><code>preferredDuringSchedulingIgnoredDuringExecution</code></li></ul><p>例如，你可以使用 <code>requiredDuringSchedulingIgnoredDuringExecution</code> 亲和性来告诉调度器，将两个服务的 Pod 放到同一个云提供商可用区内，因为它们彼此之间通信非常频繁。类似地，你可以使用 <code>preferredDuringSchedulingIgnoredDuringExecution</code> 反亲和性来将同一服务的多个 Pod 分布到多个云提供商可用区中。</p><p>要使用 Pod 间亲和性，可以使同 Pod 规约中的 <code>spec.affinity.podAffinity</code> 字段。对于 Pod 间反亲和性，可以使用 Pod 规约中的 <code>spec.affinity.podAntiAffinity</code> 字段。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>5.0.10
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
    <span class="token key atrule">podAffinity</span><span class="token punctuation">:</span>
      <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
        <span class="token comment"># 更确切的说，调度器必须将 Pod 调度到具有 cpu 标签的节点上，并且集群中至少有一个位于该可用区的节点上运行着带有 app=nqinx 标签的 Pod。</span>
        <span class="token punctuation">-</span> <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> cpu
          <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
            <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> app
                <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                <span class="token key atrule">values</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> nginx
</code></pre></div><ul><li><strong>pod 间亲和性权重</strong></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>5.0.10
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
    <span class="token key atrule">podAffinity</span><span class="token punctuation">:</span>
      <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
        <span class="token comment"># 更确切的说，调度器必须将 Pod 调度到具有 cpu 标签的节点上，并且集群中至少有一个位于该可用区的节点上运行着带有 app=nqinx 标签的 Pod。</span>
        <span class="token punctuation">-</span> <span class="token key atrule">podAffinityTerm</span><span class="token punctuation">:</span>
            <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> cpu
            <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
              <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> app
                  <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                  <span class="token key atrule">values</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> nginx
          <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
        <span class="token punctuation">-</span> <span class="token key atrule">podAffinityTerm</span><span class="token punctuation">:</span>
            <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> cpu
            <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
              <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> app
                  <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                  <span class="token key atrule">values</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> web
          <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">30</span>
</code></pre></div><h4 id="_8-7-污点和容忍度" tabindex="-1"><a class="header-anchor" href="#_8-7-污点和容忍度" aria-hidden="true">#</a> 8.7 污点和容忍度</h4><blockquote><p>参考: http://kubernetes.p2hp.com/docs/concepts/scheduling-eviction/taint-and-toleration.html</p></blockquote><h4 id="_8-8-pod-拓扑分布约束" tabindex="-1"><a class="header-anchor" href="#_8-8-pod-拓扑分布约束" aria-hidden="true">#</a> 8.8 Pod 拓扑分布约束</h4><blockquote><p>参考：http://kubernetes.p2hp.com/docs/concepts/scheduling-eviction/topology-spread-constraints/</p></blockquote><h2 id="第四章-controller-控制器" tabindex="-1"><a class="header-anchor" href="#第四章-controller-控制器" aria-hidden="true">#</a> 第四章 Controller 控制器</h2><ul><li>什么是 Controller 以及作用</li><li>常见的 ControlLer 控制器</li><li>Controller 如何管理 Pod</li><li>Deployment 基本操作与应用</li><li>StatefulSet 基本操作与应用</li><li>升级回滚和弹性伸缩</li><li>Controller 无法解决问题</li></ul><h3 id="_1-controller-控制器" tabindex="-1"><a class="header-anchor" href="#_1-controller-控制器" aria-hidden="true">#</a> 1 Controller 控制器</h3><h4 id="_1-1-什么是-controller" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是-controller" aria-hidden="true">#</a> 1.1 什么是 Controller</h4><p><code>Kubernetes 通常不会直接创建 Pod，而是通过 Controller 来管理 Pod 的。</code> <strong>Controller中定义了 Pod 的部署特性，比如有几个副本、在什么样的 Node 上运行等。</strong> 通俗的说可以认为 Controller 就是用来管理 Pod 一个对象。其核心作用可以通过一句话总结：<code>通过监控集群的公共状态，并致力于将当前状态转变为期望的状态。</code></p><p><strong>通俗定义：controller 可以管理 pod 让 pod 更具有运维能力</strong></p><h4 id="_1-2-常见的-controller-控制器" tabindex="-1"><a class="header-anchor" href="#_1-2-常见的-controller-控制器" aria-hidden="true">#</a> 1.2 常见的 ControlLer 控制器</h4><ul><li><code>Deployment</code> 是最常用的 Controller。Deployment 可以管理 Pod 的多个副本，并确保 Pod 按照期望的状态运行。</li><li><code>ReplicaSet</code> 实现了 Pod 的多副本管理。使用 Deployment 时会自动创建 ReplicaSet，也就是说 Deployment 是通过 ReplicaSet 来管理 Pod 的多个副本的，我们通常不需要直接使用 ReplicaSet。</li><li><code>Daemonset</code> 用于每个 Node 最多只运行一个 Pod 副本的场景。正如其名称所揭示的，DaemonSet 通常用于运行 daemon。</li><li><code>Statefuleset</code> 能够保证 Pod 的每个副本在整个生命周期中名称是不变的，而其他 Controller 不提供这个功能。当某个 Pod 发生故障需要删除并重新启动时，Pod 的名称会发生变化，同时 StatefuleSet 会保证副本按照固定的顺序启动、更新或者删除。</li><li><code>Job</code> 用于运行结束就删除的应用，而其他 Controller 中的 Pod 通常是长期持续运行。</li></ul><h4 id="_1-3-controller-如何管理-pod" tabindex="-1"><a class="header-anchor" href="#_1-3-controller-如何管理-pod" aria-hidden="true">#</a> 1.3 Controller 如何管理 Pod</h4><p><code>注意：Controller 通过 label 关联起来 Pods </code></p><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/4b45047b1054cd51f970d26bbf657d74.png" alt="image-20230730212203875"></p><h3 id="_2-deployment" tabindex="-1"><a class="header-anchor" href="#_2-deployment" aria-hidden="true">#</a> 2 Deployment</h3><blockquote><p>官方地址：http://kubernetes.p2hp.com/docs/concepts/workloads/controllers/deployment.html</p></blockquote><p>一个 Deployment 为 Pod 和 ReplicaSet 提供声明式的更新能力。</p><p>你负责描述 Deployment 中的 <strong>目标状态</strong>，而 Deployment 控制器（Controller）以受控速率更改实际状态，使其变为期望状态。你可以定义 Deployment 以创建新的 ReplicaSet，或删除现有 Deployment，并通过新的 Deployment 收养其资源。</p><h4 id="_2-1-创建-deployment" tabindex="-1"><a class="header-anchor" href="#_2-1-创建-deployment" aria-hidden="true">#</a> 2.1 创建 deployment</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
  <span class="token comment"># 代表 Deployment 标签 = Pod 标签 = selector 标签</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token comment"># 用来指定控制器启动 Pod 副本数量</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx  <span class="token comment"># 指定 Pod 名称</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>      <span class="token comment"># 指定 Pod 标签</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>  <span class="token comment"># 用来告知 Deployment 控制器选择带有对应标签 Pod 进行管理</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
</code></pre></div><h4 id="_2-2-查看-deployment" tabindex="-1"><a class="header-anchor" href="#_2-2-查看-deployment" aria-hidden="true">#</a> 2.2 查看 deployment</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 部署应用</span>
kubectl apply <span class="token parameter variable">-f</span> app.yaml 
<span class="token comment"># 查看 deplayment</span>
kubectl get deployment
<span class="token comment"># 查看 pod</span>
kubectl get pod <span class="token parameter variable">-o</span> wide
<span class="token comment"># 查看 pod 详情</span>
kubectl describe pod pod-name
<span class="token comment"># 查看 Deployment 详情</span>
<span class="token comment"># kubectl describe deployment &lt;deployment名称&gt;</span>
kubectl describe deployment nginx-deployment
<span class="token comment"># 查看 log</span>
kubectl logs pod-name
<span class="token comment"># 进入 Pod 容器终端，-c container-name 可以指定进入哪个容器。</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pod-name -- <span class="token function">bash</span>
<span class="token comment"># 输出到文件</span>
kubectl get deployment nginx-deployment <span class="token parameter variable">-o</span> yaml <span class="token operator">&gt;&gt;</span> test.yaml
</code></pre></div><ul><li><code>NAME</code> 列出了名字空间中 Deployment 的名称。</li><li><code>READY</code> 显示应用程序的可用的“副本”数。显示的模式是“就绪个数/期望个数”。</li><li><code>UP-TO-DATE</code> 显示为了达到期望状态已经更新的副本数。</li><li><code>AVAILABLE</code> 显示应用可供用户使用的副本数。</li><li><code>AGE</code> 显示应用程序运行的时间。</li></ul><blockquote><p>请注意期望副本数是根据 <code>.spec.replicas</code> 字段设置 3。</p></blockquote><h4 id="_2-3-扩缩-deployment" tabindex="-1"><a class="header-anchor" href="#_2-3-扩缩-deployment" aria-hidden="true">#</a> 2.3 扩缩 deployment</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询副本</span>
<span class="token comment"># kubectl get [rs|replicaset]</span>
kubectl get replicaset
<span class="token comment"># 伸缩扩展副本</span>
kubectl scale deployment nginx <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">5</span>
</code></pre></div><h4 id="_2-4-回滚-deployment" tabindex="-1"><a class="header-anchor" href="#_2-4-回滚-deployment" aria-hidden="true">#</a> 2.4 回滚 deployment</h4><blockquote><p><strong>说明：</strong></p><p>仅当 Deployment Pod 模板（即 <code>.spec.template</code> ）发生改变时，例如模板的标签或容器镜像被更新，才会触发 Deployment 上线。其他更新（如对 Deployment 执行扩缩容的操作）不会触发上线动作。</p></blockquote><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看回滚状态</span>
<span class="token comment"># kubectl rollout status [deployment nginx-deployment | deployment/nginx]</span>
kubectl rollout status deployment nginx-deployment
<span class="token comment"># 查看历史</span>
kubectl rollout <span class="token function">history</span> deployment nginx-deployment
<span class="token comment"># 查看某次历史的详细信息</span>
kubectl rollout <span class="token function">history</span> deployment/nginx-deployment <span class="token parameter variable">--revision</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token comment"># 回到上个版本</span>
kubectl rollout undo deployment nginx-deployment
<span class="token comment"># 回到指定版本</span>
kubectl rollout undo deployment nginx-deployment --to-revision<span class="token operator">=</span><span class="token number">2</span>
<span class="token comment">#重新部署</span>
kubectl rollout restart deployment nginx-deployment
<span class="token comment"># 暂停运行，暂停后，对 deployment 的修改不会立刻生效，恢复后才应用设置</span>
kubectl rollout pause deployment ngixn-deployment
<span class="token comment"># 恢复</span>
kubectl rollout resume deployment nginx-deployment
</code></pre></div><h4 id="_2-5-删除-deployment" tabindex="-1"><a class="header-anchor" href="#_2-5-删除-deployment" aria-hidden="true">#</a> 2.5 删除 deployment</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除 Deployment</span>
kubectl delete deployment nginx-deployment
kubect delete <span class="token parameter variable">-f</span> nginx-deployment.yml
<span class="token comment"># 删除默认命名空间下全部资源</span>
kubectl delete all <span class="token parameter variable">--all</span>
<span class="token comment"># 删除指定命名空间的全部资源</span>
<span class="token comment"># kubectl delete all -all -n &lt;命名空间名称&gt;</span>
kubectl delete all <span class="token parameter variable">--all</span> <span class="token parameter variable">-n</span> default
</code></pre></div><h3 id="_3-stateful-set" tabindex="-1"><a class="header-anchor" href="#_3-stateful-set" aria-hidden="true">#</a> 3 Stateful Set</h3><h4 id="_3-1-什么是-statefulset" tabindex="-1"><a class="header-anchor" href="#_3-1-什么是-statefulset" aria-hidden="true">#</a> 3.1 什么是 StatefulSet</h4><blockquote><p>官方地址：https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/statefulset/</p></blockquote><p><strong>StatefulSet 是用来管理 <code>有状态应用</code> 的工作负载 API 对象。</strong></p><p><strong>无状态应用：应用本身不存储任何数据的应用称之为无状态应用。</strong></p><p><strong>有状态应用：应用本身需要存储相关数据应用称之为有状态应用。</strong></p><p>博客: 前端vue 后端java mysql redis es ....</p><p>数据采集: 采集程序 有状态应用</p><p>StatefulSet 用来管理某 Pod 集合的部署和扩缩，<strong>并为这些 Pod 提供持久存储和持久标识符。</strong></p><p>和 Deployment 类似，StatefulSet 管理基于相同容器规约的一组 Pod。但和 Deployment 不同的是，<strong>StatefulSet 为它们的每个 Pod 维护了一个有粘性的ID。这些 Pod 是基于相同的规约来创建的，但是不能相互替换：无论怎么调度，每个 Pod 都有一个永久不变的 ID。</strong></p><p>如果希望使用存储卷为工作负载提供持久存储，可以使用 StatefulSet 作为解决方案的一部分。尽管 StatefulSet 中的单个 Pod 仍可能出现故障，但持久的 Pod 标识符使得将现有卷与替换已失败 Pod 的新 Pod 相匹配变得更加容易。</p><h4 id="_3-2-statefulset-特点" tabindex="-1"><a class="header-anchor" href="#_3-2-statefulset-特点" aria-hidden="true">#</a> 3.2 StatefulSet 特点</h4><p>StatefulSet 对于需要满足以下一个或多个需求的应用程序很有价值：</p><ul><li>稳定的、唯一的网络标识符。</li><li>稳定的、持久的存储。</li><li>有序的、优雅的部署和扩缩。</li><li>有序的、自动的滚动更新。</li></ul><p>在上面描述中，“稳定的”意味着 Pod 调度或重调度的整个过程是有持久性的。如果应用程序不需要任何稳定的标识符或有序的部署、删除或扩缩，则应该使用由一组无状态的副本控制器提供的工作负载来部署应用程序，比如 Deployment 或者 ReplicaSet 可能更适用于你的无状态应用部署需要。</p><h4 id="_3-3-限制" tabindex="-1"><a class="header-anchor" href="#_3-3-限制" aria-hidden="true">#</a> 3.3 限制</h4>`,310),V=n("li",null,[a("给定 Pod 的存储必须由 PersistentVolume Provisioner 基于所请求的 "),n("code",null,"storage class"),a(" 来制备，或者由管理员预先制备。")],-1),w=n("li",null,[a("删除或者扩缩 StatefulSet 并"),n("strong",null,"不会"),a("删除它关联的存储卷。这样做是为了保证数据安全，它通常比自动清除 StatefulSet 所有相关的资源更有价值。")],-1),I={href:"https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/#headless-services",target:"_blank",rel:"noopener noreferrer"},N=n("li",null,"当删除一个 StatefulSet 时，该 StatefulSet 不提供任何终止 Pod 的保证。 为了实现 StatefulSet 中的 Pod 可以有序且体面地终止，可以在删除之前将 StatefulSet 缩容到 0。",-1),K=n("li",null,[a("在默认 Pod 管理策略("),n("code",null,"OrderedReady"),a(") 时使用滚动更新， 可能进入需要人工干预才能修复的损坏状态。")],-1),D=t(`<h4 id="_3-4-使用-statefulset" tabindex="-1"><a class="header-anchor" href="#_3-4-使用-statefulset" aria-hidden="true">#</a> 3.4 使用 StatefulSet</h4><h5 id="_1-搭建-nfs-服务" tabindex="-1"><a class="header-anchor" href="#_1-搭建-nfs-服务" aria-hidden="true">#</a> 1 搭建 NFS 服务</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装nfs-utils</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> rpcbind nfs-utils
<span class="token comment"># 创建nfs目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/nfs/data
<span class="token comment"># 编辑/etc/exports输入如下内容</span>
<span class="token comment"># insecure:通过 1024 以上端口发送  rw:读写  sync:请求时写入共享  no_root_squash:root用户有完全根目录访问权限</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;/root/nfs/data *(insecure,rw,sync,no_root_squash)&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/exports
<span class="token comment"># 启动相关服务并配置开机自启动</span>
systemctl start rpcbind
systemctl start nfs-server
systemctl <span class="token builtin class-name">enable</span> rpcbind
systemctl <span class="token builtin class-name">enable</span> nfs-server
<span class="token comment"># 重新挂载使/etc/exports生效</span>
exportfs <span class="token parameter variable">-r</span>
<span class="token comment"># 查看共享情况</span>
exportfs
</code></pre></div><h5 id="_2-客户端测试" tabindex="-1"><a class="header-anchor" href="#_2-客户端测试" aria-hidden="true">#</a> 2 客户端测试</h5><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1.安装客户端所有节点安装</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
<span class="token comment"># 2.创建本地目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/nfs
<span class="token comment"># 3.挂载远程nfs目录到本地</span>
<span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs <span class="token number">10.15</span>.0.9:/root/nfs /root/nfs
<span class="token comment"># 4.写入一个测试文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello nfs server&quot;</span> <span class="token operator">&gt;</span> /root/nfs/test.txt
<span class="token comment"># 5.去远程 nfs 目录查看</span>
<span class="token function">cat</span> /root/nfs/test.txt

<span class="token comment"># 挂取消载</span>
<span class="token comment"># umount -f -l &lt;nfs目录&gt;</span>
<span class="token function">umount</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-l</span> /root/nfs
</code></pre></div><h5 id="_3-使用-statefulset" tabindex="-1"><a class="header-anchor" href="#_3-使用-statefulset" aria-hidden="true">#</a> 3 使用 statefulset</h5><ul><li>class.yml</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner  <span class="token comment"># or choose another name, must match deployment&#39;s env PROVISIONER_NAME&#39;</span>
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token key atrule">archiveOnDelete</span><span class="token punctuation">:</span> <span class="token string">&quot;false&quot;</span>
</code></pre></div><blockquote><p>文件来源：https://gitcode.net/mirrors/kubernetes-sigs/nfs-subdir-external-provisioner/-/blob/master/deploy/class.yaml</p></blockquote><ul><li>nfs-client-provisioner</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kebe<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Recreate
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
          <span class="token comment"># image: registry.k8s.io/sig-storage/nfs-subdir-external-provisioner:v4.0.2</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> chronolaw/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner<span class="token punctuation">:</span>v4.0.2
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /persistentvolumes
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PROVISIONER_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_SERVER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> 10.15.0.10      <span class="token comment"># 需修改</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_PATH
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /root/nfs/data  <span class="token comment"># 需修改</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.15.0.10       <span class="token comment"># 需修改</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/nfs/data     <span class="token comment"># 需修改</span>
</code></pre></div><blockquote><p>文件来源：https://gitcode.net/mirrors/kubernetes-sigs/nfs-subdir-external-provisioner/-/blob/master/deploy/deployment.yaml</p></blockquote><ul><li>rbac.yml</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kebe<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;nodes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumeclaims&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storage.k8s.io&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storageclasses&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;events&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> run<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token comment"># replace with namespace where provisioner is deployed</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kebe<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kebe<span class="token punctuation">-</span>system
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;endpoints&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kebe<span class="token punctuation">-</span>system
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token comment"># replace with namespace where provisioner is deployed</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kebe<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre></div><blockquote><p>来源地址：https://gitcode.net/mirrors/kubernetes-sigs/nfs-subdir-external-provisioner/-/blob/master/deploy/rbac.yaml</p></blockquote><ul><li>mysql.yml</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ems
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>sc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> ems
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token key atrule">onDelete</span><span class="token punctuation">:</span> <span class="token string">&quot;remain&quot;</span>
<span class="token comment">#---</span>
<span class="token comment">#apiVersion: v1</span>
<span class="token comment">#kind: PersistentVolumeClaim</span>
<span class="token comment">#metadata:</span>
<span class="token comment">#  name: mysql-pvc</span>
<span class="token comment">#  namespace: ems</span>
<span class="token comment">#spec:</span>
<span class="token comment">#  storageClassName: mysql-nfs-sc</span>
<span class="token comment">#  accessModes:</span>
<span class="token comment">#    - ReadWriteMany</span>
<span class="token comment">#  resources:</span>
<span class="token comment">#    requests:</span>
<span class="token comment">#      storage: 2G</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> ems
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> mysql  <span class="token comment"># headless  无头服务  保证网络标识符唯一  必须存在</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
          <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql/mysql<span class="token punctuation">-</span>server<span class="token punctuation">:</span><span class="token number">8.0</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
              <span class="token key atrule">value</span><span class="token punctuation">:</span> root
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql  <span class="token comment"># 自己容器写入数据目录</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> data  <span class="token comment"># 保存到指定一个变量中  变量名字就是 data</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
<span class="token comment">#      volumes:</span>
<span class="token comment">#        - name: mysql_data</span>
<span class="token comment">#          persistentVolumeClaim:</span>
<span class="token comment">#            claimName: mysql-pvc</span>
  <span class="token key atrule">volumeClaimTemplates</span><span class="token punctuation">:</span>  <span class="token comment"># 声明动态创建数据卷模板</span>
    <span class="token punctuation">-</span> <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> data       <span class="token comment"># 数据卷变量名称</span>
        <span class="token key atrule">namespace</span><span class="token punctuation">:</span> ems   <span class="token comment"># 在哪个命名空间创建数据卷</span>
      <span class="token key atrule">spec</span><span class="token punctuation">:</span>
        <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> ReadWriteMany
        <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>sc  <span class="token comment"># 使用哪个 Storage Class 模板存储数据，对应上面的 StorageClass 的 metadata.name: mysql-nfs-sc</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2G
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token comment">#---</span>
<span class="token comment">#apiVersion: v1</span>
<span class="token comment">#kind: Service</span>
<span class="token comment">#metadata:</span>
<span class="token comment">#  name: mysql</span>
<span class="token comment">#  namespace: ems</span>
<span class="token comment">#spec:</span>
<span class="token comment">#  selector:</span>
<span class="token comment">#    app: mysql</span>
<span class="token comment">#  ports:</span>
<span class="token comment">#    - port: 3306</span>
<span class="token comment">#      targetPort: 3306</span>
<span class="token comment">#      nodePort: 30006</span>
<span class="token comment">#  type: NodePort</span>
</code></pre></div><h3 id="_4-daemonset" tabindex="-1"><a class="header-anchor" href="#_4-daemonset" aria-hidden="true">#</a> 4 DaemonSet</h3><h4 id="_4-1-什么是-daemonset" tabindex="-1"><a class="header-anchor" href="#_4-1-什么是-daemonset" aria-hidden="true">#</a> 4.1 什么是 DaemonSet</h4><blockquote><p>官方地址: https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/daemonset/</p></blockquote><p><strong>DaemonSet</strong> 确保全部（或者某些）节点上运行一个 Pod 的副本。 当有节点加入集群时， 也会为他们新增一个 Pod 。 当有节点从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除它创建的所有 Pod。</p><p>DaemonSet 的一些典型用法：</p><ul><li>在每个节点上运行集群守护进程</li><li>在每个节点上运行日志收集守护进程</li><li>在每个节点上运行监控守护进程</li></ul><p>一种简单的用法是为每种类型的守护进程在所有的节点上都启动一个 DaemonSet。 一个稍微复杂的用法是为同一种守护进程部署多个 DaemonSet；每个具有不同的标志， 并且对不同硬件类型具有不同的内存、CPU 要求。</p><h4 id="_4-2-使用-daemonset" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-daemonset" aria-hidden="true">#</a> 4.2 使用 DaemonSet</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">#        terminationMessagePath: /dev/termination-log</span>
<span class="token comment">#        terminationMessagePolicy: File</span>
<span class="token comment">#      dnsPolicy: ClusterFirst</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
<span class="token comment">#      securityContext: {}</span>
<span class="token comment">#      terminationGracePeriodSeconds: 30</span>
</code></pre></div><h3 id="_5-job" tabindex="-1"><a class="header-anchor" href="#_5-job" aria-hidden="true">#</a> 5 Job</h3><h4 id="_5-1-什么是-job" tabindex="-1"><a class="header-anchor" href="#_5-1-什么是-job" aria-hidden="true">#</a> 5.1 什么是 Job</h4><blockquote><p>官网地址: https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/</p></blockquote><p>Job 会创建一个或者多个 Pod，并将继续重试 Pod 的执行，直到指定数量的 Pod 成功终止。 随着 Pod 成功结束，Job 跟踪记录成功完成的 Pod 个数。 当数量达到指定的成功个数阈值时，任务（即 Job）结束。 删除 Job 的操作会清除所创建的全部 Pod。 挂起 Job 的操作会删除 Job 的所有活跃 Pod，直到 Job 被再次恢复执行。</p><p>一种简单的使用场景下，你会创建一个 Job 对象以便以一种可靠的方式运行某 Pod 直到完成。 当第一个 Pod 失败或者被删除（比如因为节点硬件失效或者重启）时，Job 对象会启动一个新的 Pod。</p><p>你也可以使用 Job 以并行的方式运行多个 Pod。</p><h4 id="_5-2-使用-job" tabindex="-1"><a class="header-anchor" href="#_5-2-使用-job" aria-hidden="true">#</a> 5.2 使用 Job</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Job
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
        <span class="token key atrule">image</span><span class="token punctuation">:</span> perl<span class="token punctuation">:</span>5.34.0
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span><span class="token punctuation">,</span>  <span class="token string">&quot;-Mbignum=bpi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-wle&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
  <span class="token comment"># 当前任务出现失败 最大的重试次数</span>
  <span class="token key atrule">backoffLimit</span><span class="token punctuation">:</span> <span class="token number">4</span>
</code></pre></div><h4 id="_5-3-自动清理完成的-job" tabindex="-1"><a class="header-anchor" href="#_5-3-自动清理完成的-job" aria-hidden="true">#</a> 5.3 自动清理完成的 Job</h4>`,35),R={href:"https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/cron-jobs/",target:"_blank",rel:"noopener noreferrer"},A=t(`<ul><li><strong>已完成 Job 的 TTL 机制</strong><ul><li>自动清理已完成 Job （状态为 <code>Complete</code> 或 <code>Failed</code>）的另一种方式是使用由 TTL 控制器所提供的 TTL 机制。 通过设置 Job 的 <code>.spec.ttlSecondsAfterFinished</code> 字段，可以让该控制器清理掉已结束的资源。TTL 控制器清理 Job 时，会级联式地删除 Job 对象。 换言之，它会删除所有依赖的对象，包括 Pod 及 Job 本身。 注意，当 Job 被删除时，系统会考虑其生命周期保障，例如其 Finalizers。</li></ul></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Job
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pi<span class="token punctuation">-</span>with<span class="token punctuation">-</span>ttl
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ttlSecondsAfterFinished</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
        <span class="token key atrule">image</span><span class="token punctuation">:</span> perl<span class="token punctuation">:</span>5.34.0
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;perl&quot;</span><span class="token punctuation">,</span>  <span class="token string">&quot;-Mbignum=bpi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-wle&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;print bpi(2000)&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
</code></pre></div><p>Job <code>pi-with-ttl</code> 在结束 100 秒之后，可以成为被自动删除的对象。如果该字段设置为 <code>0</code>，Job 在结束之后立即成为可被自动删除的对象。 如果该字段没有设置，Job 不会在结束之后被 TTL 控制器自动清除。</p><h3 id="_6-控制器无法解决问题" tabindex="-1"><a class="header-anchor" href="#_6-控制器无法解决问题" aria-hidden="true">#</a> 6 控制器无法解决问题</h3><ul><li>如何为 Pod 提供网络服务</li><li>如何实现多个 Pod 间负载均衡</li></ul><h2 id="第五章-service" tabindex="-1"><a class="header-anchor" href="#第五章-service" aria-hidden="true">#</a> 第五章 Service</h2><ul><li>什么是 Service</li><li>为什么需要 Service</li><li>Service 特性</li><li>Service 与 Pod 关联</li><li>如何使用 Service</li><li>多端口配置</li></ul><h3 id="_1-什么是-service" tabindex="-1"><a class="header-anchor" href="#_1-什么是-service" aria-hidden="true">#</a> 1 什么是 Service</h3><h4 id="_1-1-定义" tabindex="-1"><a class="header-anchor" href="#_1-1-定义" aria-hidden="true">#</a> 1.1 定义</h4><blockquote><p>官网地址: https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/</p></blockquote><p>将运行在一个或一组 Pod 上的网络应用程序公开为网络服务的方法。</p><p><strong>通俗定义: Service 用来为 pod 提供网络服务的一种方式。</strong></p><h4 id="_1-2-为什么需要-service" tabindex="-1"><a class="header-anchor" href="#_1-2-为什么需要-service" aria-hidden="true">#</a> 1.2 为什么需要 Service</h4><p>问题: 如果一组 Pod (称为“后端“) 为集群内的其他 Pod (称为“前端”) 提供功能，那么前端如何找出并跟踪要连接的 IP 地址，以便前端可以使用提供工作负载的后端部分？</p><div class="language-mermaid" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
  A<span class="token text string">[&quot;Front pod&quot;]</span>
  B<span class="token text string">[&quot;back pod1&quot;]</span>
  C<span class="token text string">[&quot;back pod2&quot;]</span>
  A<span class="token inter-arrow-label"><span class="token arrow-head arrow operator">--</span><span class="token label property">Found ?</span><span class="token arrow operator">--&gt;</span></span>C
  A<span class="token inter-arrow-label"><span class="token arrow-head arrow operator">--</span><span class="token label property">Found ?</span><span class="token arrow operator">--&gt;</span></span>B
</code></pre></div><p>如果这是一个图片处理后端，它运行了了个副本，这些副本是可互换的 -- 前端不需要关心它们调用了哪个后端副本。 然而组成这一组后端程序的 Pod 实际上可能会发生变化， 前端客户端不应该也没必要知道，而且也不需要跟踪这一组后端的状态。<strong>Service 定义的抽象能够解耦这种关联。</strong></p><div class="language-mermaid" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
  A<span class="token text string">[&quot;Front pod&quot;]</span>
  B<span class="token text string">[&quot;Service&quot;]</span>
  C<span class="token text string">[&quot;back pod1&quot;]</span>
  D<span class="token text string">[&quot;back pod2&quot;]</span>
  A<span class="token arrow operator">--&gt;</span>B
  B<span class="token arrow operator">-.-&gt;</span>C
  B<span class="token arrow operator">-.-&gt;</span>D
</code></pre></div><h3 id="_2-特性" tabindex="-1"><a class="header-anchor" href="#_2-特性" aria-hidden="true">#</a> 2 特性</h3><ul><li>Service 通过 label 关联对应的 Pod</li><li>Servcie 生命周期不跟 Pod 绑定，不会因为 Pod 重新创建而改变 IP</li><li>提供了负载均衡功能，自动转发流量到不同 Pod</li><li>可对集群外部提供访问端口</li><li>集群内部可通过服务名字访问</li></ul><h3 id="_3-service-和-pod-关系" tabindex="-1"><a class="header-anchor" href="#_3-service-和-pod-关系" aria-hidden="true">#</a> 3 Service 和 Pod 关系</h3><div class="language-mermaid" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TD
  A<span class="token text string">[&quot;Service&quot;]</span>
  B<span class="token text string">[&quot;Pod&quot;]</span>
  C<span class="token text string">[&quot;Pod&quot;]</span>
  D<span class="token text string">[&quot;Pod&quot;]</span>
  A<span class="token inter-arrow-label"><span class="token arrow-head arrow operator">-.</span><span class="token label property">Label: app: test</span><span class="token arrow operator">.-&gt;</span></span>B
  A<span class="token inter-arrow-label"><span class="token arrow-head arrow operator">-.</span><span class="token label property">Label: app: dev</span><span class="token arrow operator">.-&gt;</span></span>C
  A<span class="token inter-arrow-label"><span class="token arrow-head arrow operator">-.</span><span class="token label property">Label: app: blog</span><span class="token arrow operator">.-&gt;</span></span>D
</code></pre></div><h3 id="_4-使用-service" tabindex="-1"><a class="header-anchor" href="#_4-使用-service" aria-hidden="true">#</a> 4 使用 Service</h3><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>  <span class="token comment"># Service 端口</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># 容器端口</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">31001</span>  <span class="token comment"># Node 节点端口 固定在 30000-32767 之间</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
</code></pre></div><p><code>注意：节点端口固定在 30000-32767 之间</code></p><h3 id="_5-多端口" tabindex="-1"><a class="header-anchor" href="#_5-多端口" aria-hidden="true">#</a> 5 多端口</h3><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span><span class="token number">1.19</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>  <span class="token comment"># Service 端口</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> write
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>  <span class="token comment"># 容器端口</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">31001</span>  <span class="token comment"># Node 节点端口 固定在 30000-32767 之间</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8081</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> read
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">31002</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
</code></pre></div><h3 id="_6-类型-type" tabindex="-1"><a class="header-anchor" href="#_6-类型-type" aria-hidden="true">#</a> 6 类型 type</h3><blockquote><p>官网地址：https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/</p></blockquote><p>对一些应用的某些部分（如前端），可能希望将其暴露给 Kubernetes 集群外部的 IP 地址。</p><p>Kubernetes <code>ServiceTypes</code> 允许指定你所需要的 Service 类型。</p><ul><li><code>ClusterIP</code>: 在集群内部暴露 Service，只能被集群内部的其他对象访问，通常用于内部服务发现，不会向集群外部暴露。</li><li><code>NodePort</code>: 将 Service 暴在 Node 的某个口上，从而可以通过 Node 的 IP 地址和端号来访间 Service 通常用于开发和测试环境。</li><li><code>LoadBalancer</code>: 通过云服务商提供的负载均衡器来将 Service 暴露到公网上，使得外部用户可以访问 Service。</li><li><code>ExternalName</code>: 将 Service 映射到一个 DNS 名称上从而可以通过 DNS 名称来访问 Servce，通常用于访问外部服务。</li></ul><h4 id="_6-1-clusterip-类型" tabindex="-1"><a class="header-anchor" href="#_6-1-clusterip-类型" aria-hidden="true">#</a> 6.1 ClusterIP 类型</h4><ul><li><code>这是最常用的 Servic 类型之一。</code>在集群内部创建一个虚拟 IP 地址，它可以被其他在同一集群内的 Pod 访问，但不能被集群外部的请求所访问。这种类型的服务通常用于内部服务的暴露，例如数据库或者缓存服务。比如在一个 Web 应用中，你可能需要连接到一个数据库，但是这个数据库并不需要在应用之外暴露。这时候，你可以使用 ClusterIP 类型的 Srvice，让应用可以访问到数据库。</li></ul><h4 id="_6-2-nodeport-类型" tabindex="-1"><a class="header-anchor" href="#_6-2-nodeport-类型" aria-hidden="true">#</a> 6.2 NodePort 类型</h4><ul><li>这种类型的 Service 将会创建一个端口，并绑定到每个集群节点上，从而允许外部流量访问 Service。这个类型通常用于公共服务的暴露，例如 Web 应用或者 API。比如你需要在集群外部访问到一个运行在集群中的 Web 应用，你就可以创建一个 NodePort 类型的 Sevice，通过指定 Service 的 <code>nodePort</code> 字段，来将 Service 暴露给集群外部。</li><li>如果你将 <code>type</code> 字段设置为 <code>NodePort</code>，则 Kubernetes 控制平面将在 <code>--service-node-port-range</code> 标志指定的范围内分配端口（默认值：30000-32767）。</li></ul><h4 id="_6-3-loadbalancer-类型" tabindex="-1"><a class="header-anchor" href="#_6-3-loadbalancer-类型" aria-hidden="true">#</a> 6.3 LoadBalancer 类型</h4><ul><li>这种类型的 Service 类似于 NodePort，但是会在云厂商中创建一个负载均衡器。这个类型通常用于在云平台上部署应用。云平台的负载均衡器将流分发到集群中的节点。这个类型的 Service 只能在云平台上使用，并且需要云厂商提供支持。</li></ul><h4 id="_6-4-externalname-类型" tabindex="-1"><a class="header-anchor" href="#_6-4-externalname-类型" aria-hidden="true">#</a> 6.4 ExternalName 类型</h4><ul><li>这种类型的 Service 允许 Service 到任何需要访问的 CNAME DNS 条目的转发与其它类型的 Service 不同，它并不会代理请求到任何 Pod。相反，它将请求转发到配置的外部地址。这种类型的 Service 通常用于将服务代理到集群外部的其他服务。比如你有一个运行在外部网络上的服务，你希望在 Kubernetes 集群中使用该服务，这时候你可以创建一个 ExternalName 类型的 Service，将服务的 DNS 解析到 Kubernetes 集群中。</li></ul><h3 id="_7-内部通信" tabindex="-1"><a class="header-anchor" href="#_7-内部通信" aria-hidden="true">#</a> 7 内部通信</h3><h4 id="_7-1-创建-pod" tabindex="-1"><a class="header-anchor" href="#_7-1-创建-pod" aria-hidden="true">#</a> 7.1 创建 pod</h4><p>mysql-1.yml</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
          <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql/mysql<span class="token punctuation">-</span>server<span class="token punctuation">:</span><span class="token number">8.0</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
              <span class="token key atrule">value</span><span class="token punctuation">:</span> root
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre></div><p>nginx-1.yml</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest
<span class="token comment">#          command: [&quot;/bin/sh&quot;, &quot;-c&quot;]</span>
<span class="token comment">#          args:</span>
<span class="token comment">#            - apt-get update &amp;&amp; apt-get install -y mysql-client &amp;&amp; nginx -g &#39;daemon off;&#39;</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8081</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre></div><h4 id="_7-2-互相访问" tabindex="-1"><a class="header-anchor" href="#_7-2-互相访问" aria-hidden="true">#</a> 7.2 互相访问</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入 nginx 访问 mysql</span>
mysql <span class="token parameter variable">-h</span> mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-ppassword</span>
<span class="token comment"># 注意: 这里的 mysql 是 MySQL Service 的名称，而不是 Pod 的名称。</span>
</code></pre></div><h2 id="第六章-存储" tabindex="-1"><a class="header-anchor" href="#第六章-存储" aria-hidden="true">#</a> 第六章 存储</h2><ul><li>什么是卷 Volume</li><li>常用卷的类型</li><li>使用方式</li><li>Persistent Volume 和 Persistent Volume Claim</li><li>静态供给</li><li>动态供给</li></ul><h3 id="_1-卷-volume" tabindex="-1"><a class="header-anchor" href="#_1-卷-volume" aria-hidden="true">#</a> 1 卷 Volume</h3><blockquote><p>官网地址: https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/</p></blockquote><p>Container 中的文件在磁盘上是临时存放的，这给 Container 中运行的较重要的应用程序带来一些问题。问题之一是当容器崩溃时文件丢失。kubelet 会重新启动容器，但容器会以干净的状态重启。 第二个问题会在同一 <code>Pod</code> 中运行多个容器并共享文件时出现。<code>Kubernetes Volume 这一抽象概念能够解决这两个问题。</code></p><h3 id="_2-卷的类型" tabindex="-1"><a class="header-anchor" href="#_2-卷的类型" aria-hidden="true">#</a> 2 卷的类型</h3><p>Kubernetes 支持很多类型的卷。 Pod 可以同时使用任意数目的卷类型。 临时卷类型的生命周期与 Pod 相同， 但持久卷可以比 Pod 的存活期长。 当 Pod 不再存在时，Kubernetes 也会销毁临时卷；不过 Kubernetes 不会销毁持久卷。 对于给定 Pod 中任何类型的卷，在容器重启期间数据都不会丢失。</p><p>卷的核心是一个目录，其中可能存有数据，Pod 中的容器可以访问该目录中的数据。 所采用的特定的卷类型将决定该目录如何形成的、使用何种介质保存数据以及目录中存放的内容。常用的卷类型有 <strong>configMap、emptyDir、Local、nfs、secret</strong> 等。</p><ul><li>configMap: 可以将配置文件以键值对的形式保存到 ConfigMap 中并且可以在 Pod 中以文件或环境变量的形式使用。ConfigMap 可以用来存储不敏感的配置信息，如应用程序的配置文件。</li><li>EmptyDir: 是一个空目录，可以在 Pod 中用来存储临时数据，当 Pod 被删除时，该目录也会被删除。</li><li>Local: 将本地文件系统的目录或文件映射到 Pod 中的一个 Volume 中，可以用来在 Pod 中共享文件或数据。</li><li>NFS: 将网络上的一个或多个 NFS 共享目录挂载到 Pod 中的 Volume 中可以用来在多个 Pod 之间共享数据。</li><li>Secret: 将敏感信息以密文的形式保存到 Secret 中，并且可以在 Pod 中以文件或环境变量的形式使用。Secret 可以用来存储敏感信息，如用户名密码、证书等。</li></ul><h3 id="_3-使用方式" tabindex="-1"><a class="header-anchor" href="#_3-使用方式" aria-hidden="true">#</a> 3 使用方式</h3><p>使用卷时, 在 <code>.spec.volumes</code> 字段中设置为 Pod 提供的卷，并在 <code>.spec.containers[*].volumeMounts</code> 字段中声明卷在容器中的挂载位置。 容器中的进程看到的文件系统视图是由它们的容器镜像的初始内容以及挂载在容器中的卷（如果定义了的话）所组成的。 其中根文件系统同容器镜像的内容相吻合。 任何在该文件系统下的写入操作，如果被允许的话，都会影响接下来容器中进程访问文件系统时所看到的内容。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> test
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox<span class="token punctuation">:</span><span class="token number">1.28</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">...</span><span class="token punctuation">...</span><span class="token punctuation">...</span><span class="token punctuation">...</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">...</span><span class="token punctuation">...</span><span class="token punctuation">...</span><span class="token punctuation">...</span>.
</code></pre></div><h3 id="_4-常见类型" tabindex="-1"><a class="header-anchor" href="#_4-常见类型" aria-hidden="true">#</a> 4 常见类型</h3><h4 id="_4-1-emptydir" tabindex="-1"><a class="header-anchor" href="#_4-1-emptydir" aria-hidden="true">#</a> 4.1 emptyDir</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> emptydir<span class="token punctuation">-</span>example
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> writer
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;echo &#39;Hello World!&#39; &gt; /data/hello.txt&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> shared<span class="token punctuation">-</span>data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> reader
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;cat /data/hello.txt&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> shared<span class="token punctuation">-</span>data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> shared<span class="token punctuation">-</span>data
      <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p><code>总结: emptyDir 是 Host 上创建的临时目录，其优点是能够方便地为 Pod 中的容器提供共享存储，不需要额外的配置，它不具备持久性，如果 Pod 不存在了，emptyDir 也就没有了。根据这个特性，emptyDir 特别适合 Pod 中的容器需要临时共享存储空间的场景，比如前面的生产者消费者用例。</code></p><h4 id="_4-2-hostpath" tabindex="-1"><a class="header-anchor" href="#_4-2-hostpath" aria-hidden="true">#</a> 4.2 hostPath</h4><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox<span class="token punctuation">-</span>hostpath
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;echo &#39;hello&#39; &gt; /data/data.txt &amp;&amp; sleep 3600&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data
      <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/hostpath
</code></pre></div><p><code>总结: 如果 Pod 被销毁了，hostPath 对应的目录还是会被保留，从这一点来看，hostPath 的持久性比 emptyDir 强。不过一旦 Host 崩溃，hostPath 也就无法访问了。但是这种方式也带来另外一个问题增加了 pod 与节点的耦合。</code></p><h4 id="_4-3-nfs" tabindex="-1"><a class="header-anchor" href="#_4-3-nfs" aria-hidden="true">#</a> 4.3 nfs</h4><p>nfs: network filesystem : 网络文件存储系统</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>test
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;while true; do sleep 3600; done&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>volume
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /mnt/nfs
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>volume
      <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
        <span class="token key atrule">server</span><span class="token punctuation">:</span> &lt;NFS_SERVER_IP<span class="token punctuation">&gt;</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /path/to/nfs/share
</code></pre></div><p><code>总结: 相对于 emptyDir 和 hostPath，这种 volume 类型的最大特点就是不依赖 Kuberees Volume 的底层基础设施由独立的存储系统管理，与 Kubernetes 集群是分离的。数据被持久化后，即使整个 Kubernetes 崩溃也不会受损。当然，运维这样的存储系统通常不是一项简单的工作，特别是对可靠性、可用性和扩展性 有较高要求的时候。</code></p><h3 id="_5-pv-pvc" tabindex="-1"><a class="header-anchor" href="#_5-pv-pvc" aria-hidden="true">#</a> 5 PV &amp; PVC</h3><h4 id="_5-1-问题" tabindex="-1"><a class="header-anchor" href="#_5-1-问题" aria-hidden="true">#</a> 5.1 问题</h4><p>Volume 提供了非常好的数据持久化方案，不过在可管理性上还有不足。前面 nfs 例子来说，要使用 Volume，Pod 必须事先知道一下信息:</p><ul><li>当前的 Volume 类型并明确 Volume 已经创建好。</li><li>必须知道 Volume 的具体地址信息。</li></ul><p>但是 Pod 通常是由应用的开发人员护，而 Volume 则通常是由存储系统的管理员维护。开发人员要获得上面的信息，要么询问管理员，要么自己就是管理员。这样就带来一个管理上的问题: 应用开发人员和系统管理员的职责耦合在一起了。如果系统规模较小或者对于开发环境，这样的情况还可以接受，当集群规模变大，特别是对于生产环境，考虑到效率和安全性，这就成了必须要解决的问题。</p><h4 id="_5-2-pv-pvc" tabindex="-1"><a class="header-anchor" href="#_5-2-pv-pvc" aria-hidden="true">#</a> 5.2 PV &amp; PVC</h4><p>Kubernetes 给出的解决方案是 <code>Persistent Volume 和 Persistent Volume claim</code>。</p><p>PersistentVolume(PV) 是外部存储系练中的一块存储空间，由管理员创建和维护与 Volume 一样。PV 是有持久性，生命周期独立于 Pod。</p><p>Persistent Volume Claim (PVC)是对 PV 的请 (Claim)。PVC 通常由普通用户创建和维护。需要为 Pod 分配存储资源时，用户可以创建一个 PVC，指存储资源的容量大小和访问模式 (比如只读) 等信息，Kubernetes 会查找并提供满足条件的 PV。有了 PersistentVolumeClaim，用户只需要告诉 Kubernetes 需要什么样的存储资源，，而不必关心真正的空间从哪里分配、如何访问等底层细节信息。这些 Storage Provider 的底层信息交给管理员来处理，只有管理员才应该关心创建 PersistentVolume 的细节信息。</p><h4 id="_5-3-基本使用" tabindex="-1"><a class="header-anchor" href="#_5-3-基本使用" aria-hidden="true">#</a> 5.3 基本使用</h4><ul><li>创建 PV</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pv
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi  <span class="token comment"># 指定容量大小</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>  <span class="token comment"># 访问模式</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /<span class="token punctuation">{</span>nfs<span class="token punctuation">-</span>server目录名称<span class="token punctuation">}</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>nfs<span class="token punctuation">-</span>server IP 地址<span class="token punctuation">}</span>
</code></pre></div><ul><li><p><strong>accessModes:</strong> 支持的访问模式有3种:</p><ul><li>ReadWriteOnce 表示 PV 能以 readwrite 模式 mount 到单个节点 <ul><li>这个PV只能被某个节点以读写方式挂载，意味着这个PV只能被一个Pod挂载到某个节点上，并且这个Pod可以对这个PV进行读写操作。如果尝试在其他节点上挂载这个PV，就会失败。</li></ul></li><li>ReadOnlyMany 表示 PV 能以 read-only 模式 mount 到多个节点。 <ul><li>这个PV能被多个节点以只读方式挂载，意味着这个PV可以被多个Pod挂载到多个节点上。</li></ul></li><li>ReadWriteMany 表示 PV 能以 read-write 模式 mount 到多个节点。 <ul><li>这个PV能被多个节点以读写方式挂载，意味着这个PV可以被多个Pod挂载到多个节点上。</li></ul></li></ul></li><li><p><strong>persistentVolumeReclaimPolicy:</strong> 指定当 PV 的回收策略支持的策略有3种:</p><ul><li><p>Retain: 在 PVC 被删除后，保留 PV 和其数据，手动清理 PV 中的数据。</p></li><li><p>Delete: 在 PVC 被删除后，自动删除 PV 和其数据。</p></li><li><p>Recycle: 在 PVC 被删除后，通过删除 PV 中的数据来准备 PV 以供重新使用。</p><p>值得注意的是，<code>persistentVolumeReclaimPoliy</code> 只适用于一些类型的 PV，如 NFS、HostPath、iSCSI 等。对于一些云平台提供的存储，如 AWS EBS 和 Azure Disk，由于底层提供商会自动处理 PV 的回收问题，因此该属性不适用。</p></li></ul></li><li><p><strong>storageClassName:</strong> 指定 PV 的 class 为 nfs。相当于为 PV 设置了一个分类，PVC 可以指定 class 申请相应 class 的 PV。</p></li><li><p>创建 PVC</p></li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs  <span class="token comment"># 通过名字进行选择</span>
<span class="token comment">#  selector:  # 通过标签形式</span>
<span class="token comment">#    matchLabels:</span>
<span class="token comment">#      pv-name: nfs-pv</span>
</code></pre></div><ul><li>使用 PVC</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox<span class="token punctuation">-</span>nfs
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;while true; do echo &#39;Hello NFS!&#39; &gt;&gt; /data/index.html; sleep 1; done&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>volume
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>volume
      <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
        <span class="token key atrule">claimName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pvc
</code></pre></div><h4 id="_5-4-动态供给" tabindex="-1"><a class="header-anchor" href="#_5-4-动态供给" aria-hidden="true">#</a> 5.4 动态供给</h4><p>在前面的例子中，我们提前创建了PV，然后通过 PVC 申请 PV 并在 Pod 中使用，这种方式叫作静态供给 (Static Provision) 与之对应的是动态供给 (Dynamical Provision)，即如果没有满足 PVC 条件的 PV，会动态创建 PV。相比静态供给，动态供给有明显的优势: 不需要提前创建 PV，减少了管理员的工作量，效率高。动态供给是通过 StorageClass 实现的，StorageClass 定了如何创建 PV，但需要注意的是每个 StorageClass 都有一个制备器 (Provisioner)，用来决定使用哪个卷插件制备 PV。 该字段必须指定。(https://kubernetes.io/zh-cn/docs/concepts/storage/storage-classes/) 才能实现动态创建，下面我们以 NFS 为例:</p><blockquote><p>地址： https://github.com/openebs/dynamic-nfs-provisioner</p></blockquote><ul><li>定义 NFS Provisioner</li></ul><p>eployment.yaml</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Recreate
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
          <span class="token key atrule">image</span><span class="token punctuation">:</span> chronolaw/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner<span class="token punctuation">:</span>v4.0.2
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /persistentvolumes
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PROVISIONER_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_SERVER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> 10.15.0.25
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_PATH
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /root/nfs/data
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.15.0.25
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /root/nfs/data
</code></pre></div><p>rbac.yaml</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;nodes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumeclaims&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storage.k8s.io&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storageclasses&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;events&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> run<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token comment"># replace with namespace where provisioner is deployed</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;endpoints&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token comment"># replace with namespace where provisioner is deployed</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre></div><ul><li>定义 StorageClass</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>sc
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> k8s<span class="token punctuation">-</span>sigs.io/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token key atrule">onDelete</span><span class="token punctuation">:</span> <span class="token string">&quot;remain&quot;</span>
</code></pre></div><ul><li>使用 StorageClass 动态创建</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> mysql  <span class="token comment"># headless  无头服务  保证网络标识符唯一  必须存在</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
          <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql/mysql<span class="token punctuation">-</span>server<span class="token punctuation">:</span><span class="token number">8.0</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
              <span class="token key atrule">value</span><span class="token punctuation">:</span> root
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql  <span class="token comment"># 自己容器写入数据目录</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> data  <span class="token comment"># 保存到指定一个变量中  变量名字就是 data</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">volumeClaimTemplates</span><span class="token punctuation">:</span>  <span class="token comment"># 声明动态创建数据卷模板</span>
    <span class="token punctuation">-</span> <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> data       <span class="token comment"># 数据卷变量名称</span>
      <span class="token key atrule">spec</span><span class="token punctuation">:</span>
        <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>     <span class="token comment"># 访问模式</span>
          <span class="token punctuation">-</span> ReadWriteMany
        <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>sc  <span class="token comment"># 使用哪个 Storage Class 模板存储数据</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2G
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
</code></pre></div><h2 id="第七章-configmap-secret" tabindex="-1"><a class="header-anchor" href="#第七章-configmap-secret" aria-hidden="true">#</a> 第七章 ConfigMap &amp; Secret</h2><ul><li>ConfigMap</li><li>Secret</li></ul><h3 id="_1-configmap" tabindex="-1"><a class="header-anchor" href="#_1-configmap" aria-hidden="true">#</a> 1 ConfigMap</h3><h4 id="_1-1-简介-1" tabindex="-1"><a class="header-anchor" href="#_1-1-简介-1" aria-hidden="true">#</a> 1.1 简介</h4><p>在 Kubernetes 中，<strong>ConfigMap 是一种用于存储非敏感信息的 Kubernetes 对象</strong>。它用于存储配置数据，如键值对、整个配置文件或 JSON 数据等。ConfigMap 通常用于容器镜像中的配置文件、命令行参数和环境变量等。</p><p>ConfigMap 可以通过三种方式进行配置数据的注入:</p><ol><li>环境变量注入: 将配置数据注入到 Pod 中的容器环境变量中。</li><li>配置文件注入: 将配置数据注入到 Pod 中的容器文件系统中，容器可以读取这些文件。</li><li>命令行参数注入: 将配置数据注入到容器的命令行参数中。</li></ol><h4 id="_1-2-优点" tabindex="-1"><a class="header-anchor" href="#_1-2-优点" aria-hidden="true">#</a> 1.2 优点</h4><ol><li>避免了硬编码，将配置数据与应用代码分离。</li><li>便于维护和更新，可以单独修改 ConfigMap 而不需要重新构建镜像。</li><li>可以通过多种方式注入配置数据，更加灵活。</li><li>可以通过 Kubernetes 的自动化机制对 ConfigMap 进行版本控制和回滚。</li><li>ConfigMap 可以被多个 Pod 共享，减少了配置数据的重复存储。</li></ol><h4 id="_1-3-定义-configmap" tabindex="-1"><a class="header-anchor" href="#_1-3-定义-configmap" aria-hidden="true">#</a> 1.3 定义 ConfigMap</h4><ul><li><p><strong>命令行创建:</strong></p><ul><li><p>可以使用 <code>kubectl create configmap</code> 命令来创建 configmap，具体命令如下:</p></li><li><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap my-config --from-literal<span class="token operator">=</span>key1<span class="token operator">=</span>value1 --from-literal<span class="token operator">=</span>key2<span class="token operator">=</span>value2
</code></pre></div></li></ul></li><li><p><strong>通过配置文件创建: 推荐</strong></p><ul><li><p>可以通过创建YAML文件的方式来定义configmap的内容。例如，创建一个名为 <code>my-config</code> 的 configmap，内容如下</p></li><li><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>config
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">key1</span><span class="token punctuation">:</span> value1
  <span class="token key atrule">key2</span><span class="token punctuation">:</span> value2
</code></pre></div></li><li><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> app<span class="token punctuation">-</span>config
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">application.yml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    name: xiaochen</span>
</code></pre></div></li><li><p>然后使用 <code>kubectl apply -f</code> 命令来创建 configmap。</p></li></ul></li><li><p><strong>通过文件创建:</strong></p><ul><li><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> admin <span class="token operator">&gt;</span>./user
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token number">123456</span> <span class="token operator">&gt;</span> ./password
kubectl create configmap generic myconfigmap --fnom-fiLe<span class="token operator">=</span>./username --from-file<span class="token operator">=</span>./password
</code></pre></div></li></ul></li><li><p><strong>通过文件夹创建:</strong></p><ul><li><p>可以将多个配置文件放在同一个文件夹下，然后使用 <code>kubectl create configmap</code> 命令来创建configmap，例如:</p></li><li><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap my-config --from-file<span class="token operator">=</span>config-files/
</code></pre></div></li><li><p>这将创建一个名为 <code>my-config</code> 的configmap，其中包含 <code>config-files/</code> 文件夹下所有的文件内容作为键值对。</p></li></ul></li><li><p><strong>通过环境变量创建:</strong></p><ul><li><p>可以将环境变量的值转换为configmap。例如，使用以下命令将当前环境变量的值转换为configmap:</p></li><li><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap my-config --from-env-file<span class="token operator">=</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">env</span><span class="token punctuation">)</span>
</code></pre></div></li></ul></li></ul><h4 id="_1-4-使用" tabindex="-1"><a class="header-anchor" href="#_1-4-使用" aria-hidden="true">#</a> 1.4 使用</h4><ul><li>环境变量使用</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>container
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;echo $BUSY_NAME; sleep 3600;&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token comment"># name: 是容器需要环境变量名称</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> BUSY_NAME
        <span class="token comment"># valueForm: value  来源与什么</span>
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>  <span class="token comment"># 值来源与 configmap 来源与哪个 configmap 来源与哪个 configmap 中 key</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> app<span class="token punctuation">-</span>cm
              <span class="token key atrule">key</span><span class="token punctuation">:</span> name
      <span class="token comment"># 一次性注入这个 configmap</span>
      <span class="token key atrule">envFrom</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">configMapRef</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>config
</code></pre></div><p><code>注意: env 是指定 configmap 中某个 key 进行注入 envForm 将 configmap 中内容全部注入</code></p><ul><li>通过 Volume 使用配置</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
      <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>image
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sleep 3600&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data<span class="token punctuation">-</span>volume
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data<span class="token punctuation">-</span>volume
      <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> application<span class="token punctuation">-</span>config
</code></pre></div><h3 id="_2-secret" tabindex="-1"><a class="header-anchor" href="#_2-secret" aria-hidden="true">#</a> 2 Secret</h3><h4 id="_2-1-简介" tabindex="-1"><a class="header-anchor" href="#_2-1-简介" aria-hidden="true">#</a> 2.1 简介</h4><p>在 Kubernetes 中，Secret 是一种用于存储和管理敏感信息的对象类型，如密码、API密钥、证书等等。它们与 ConfigMap 相似，但在处理敏感信息时，Secret 会提供更高的安全性和保密性。</p><p>Secret 可以用于将这些敏感信息注入到容器中，并确保这些信息在运行时不会被意外泄漏或暴露给其他人，Secret 可以通过多种方式定义和使用，例如查接定义、从文件中加载、从环境变量中加载等。</p><p>在 Kubernetes 中，Secrets 通常被用于以下场景:</p><ul><li>作为卷挂载到 Pod 中，用于存储证书、密钥等敏感文件</li><li>在 Pod 中使用环境变量，用于存储用户名和密码等敏感信息</li><li>用于存储 Docker 镜像仓库的登录信息</li><li>用于存储外部服务的 API 密钥</li></ul><p>Secrets 可以在 Pod 的 spec 中通过 volume 和环境变量的方式引用。当容器使用 volume 来引用 Secret 时，Secret 会以文件的形式挂载到容器中。当容器使用环境变量来引用 Secret 时，Secret 中的数据会以 base64 编码后，以键值对的形式注入到容器的环境变量中。</p><p><code>需要注意的是，Secret 并不提供强大的安全保证，只是简单地将数据存储在 base64 编码的形式下，并不提供加密或其他安全措施，因此不要将高度敏感的信息存储在 Secret 中。在处理高度敏感的信息时，需要使用更高级别的保护机制，如使用加密数据的 Volume 类型，或者使用第三方加密解决方案等。</code></p><h4 id="_2-1-定义-secret" tabindex="-1"><a class="header-anchor" href="#_2-1-定义-secret" aria-hidden="true">#</a> 2.1 定义 Secret</h4><ul><li><p><strong>使用命令行创建:</strong></p><ul><li><p>可以使用 kubectl create secret 命令来创建 secret，例如:</p></li><li><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl create secret generic my-secret --from-literal<span class="token operator">=</span>username<span class="token operator">=</span>admin --from-literal<span class="token operator">=</span>password<span class="token operator">=</span>admin123
</code></pre></div></li></ul></li><li><p><strong>使用 YAML 文件定义:</strong></p><ul><li><p>可以创建一个 YAML 文件来定义 Secret 对象，例如:</p></li><li><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>secret
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">username</span><span class="token punctuation">:</span> YWRtaW4=  <span class="token comment"># base64 编码后的用户名 admin</span>
  <span class="token key atrule">password</span><span class="token punctuation">:</span> MWYyZDFlMmU2N2Rm  <span class="token comment"># base64 编码后的密码 1f2d1e2e67df</span>
</code></pre></div></li><li><p><code>注意: 这个 YAML 文件定义了一个名为 my-secret 的 Secret 对象，其中包含了两个 base64 编码后的 key-value 对: username 和 password。</code></p></li></ul></li><li><p><strong>使用文件创建:</strong></p><ul><li><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> admin <span class="token operator">&gt;</span>./username
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token number">123456</span> <span class="token operator">&gt;</span> ./password
kubectl create secret generic mysecret --from-file<span class="token operator">=</span>./username --from-file<span class="token operator">=</span>./password
</code></pre></div></li></ul></li><li><p><strong>通过环境变量创建:</strong></p><ul><li><p>可以将环境变量的值转换为secret。例如，使用以下命令将当前环境变量的值转换为secret:</p></li><li><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>kubectl create secret generic my-config --from-env-file<span class="token operator">=</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token function">env</span><span class="token punctuation">)</span>
</code></pre></div></li></ul></li></ul><h4 id="_2-2-使用" tabindex="-1"><a class="header-anchor" href="#_2-2-使用" aria-hidden="true">#</a> 2.2 使用</h4><ul><li>使用 Secret</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>container
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sleep 3600;&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> USERNAME
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>secret
              <span class="token key atrule">key</span><span class="token punctuation">:</span> username
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PASSWORD
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>secret
              <span class="token key atrule">key</span><span class="token punctuation">:</span> password
      <span class="token comment"># 一次性注入这个 secret</span>
      <span class="token key atrule">envFrom</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">secretRef</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>secret
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
</code></pre></div><ul><li>volume 使用</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>pod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
      <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
      <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sleep 3600&quot;</span><span class="token punctuation">]</span>
      <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>volume
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>volume
      <span class="token key atrule">secret</span><span class="token punctuation">:</span>
        <span class="token key atrule">secretName</span><span class="token punctuation">:</span> aaa
</code></pre></div><h2 id="第八章-ingress" tabindex="-1"><a class="header-anchor" href="#第八章-ingress" aria-hidden="true">#</a> 第八章 Ingress</h2><ul><li>什么是 Ingress</li><li>Ingress 和 Service 区别</li><li>Ingress 控制器 Traefik 使用</li><li>Ingress Route的定义</li></ul><h3 id="_1-简介-1" tabindex="-1"><a class="header-anchor" href="#_1-简介-1" aria-hidden="true">#</a> 1 简介</h3><blockquote><p>官网地址: https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/</p></blockquote><p>Ingress 是一种 Kubernetes 资源类型，它允许在 Kubernetes 集群中暴露 HTTP 和 HTTPS 服务。通过 Ingress，您可以将流量路由到不同的服务和端点，而无需使用不同的负载均衡器。Ingress 通常使用 Ingress Controller 实现，它是一个运行在 Kubernetes 集群中的负载均衡器，它根据 Ingress 规则配置路由规则并将流量转发到相应的服务。</p><p>在 Kubernetes 中，一个 Ingress 资源定义了一组规则，这些规则用于指定外部流量如何到达集群中的服务。Ingress 资源定义包括域名、服务、路径和其他信息，通过这些信息，Ingress Controller 就能够将请求路由到正确的服务。同时，Ingress 还提供了 TLS 选项，可以使用 SSL/TLS 来加密传输数据。</p><p>总之，Ingress 是一种强大的 Kubernetes 资源类型，可以帮助您在 Kubernetes 集群中轻松地管理 HTTP 和 HTTPS 服务，并提供灵活的路由和负载均衡选项。</p><p>Ingress 简单示例：</p><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/4750fd35e0e9e5ce649cb064974e2c54.svg" alt="ingress-diagram"></p><h3 id="_2-ingress-和-service-区别" tabindex="-1"><a class="header-anchor" href="#_2-ingress-和-service-区别" aria-hidden="true">#</a> 2 Ingress 和 Service 区别</h3><p>Ingress 和 Service 都是 Kubernetes 中用于将流量路由到应用程序的机制，但它们在路由层面上有所不同：</p><ul><li>Service 是 Kubernetes 中抽象的应用程序服务，它公开了一个单一的IP地址和端口，可以用于在 Kubernetes 集群内部的 Pod 之间进行流量路由。</li><li>Ingress 是一个 Kubernetes 资源对象，它提供了对集群外部流量路由的规则。Ingress 通过一个公共 IP 地址和端口将流量路由到一个或多个Service。</li></ul><h3 id="_3-ingress-controller" tabindex="-1"><a class="header-anchor" href="#_3-ingress-controller" aria-hidden="true">#</a> 3 Ingress Controller</h3><p>Ingress Controller 是 Kubernetes 中的一种资源，它负责将外部请求转发到集群内部的 Service 中，并提供负载均衡、SSL 终止等功能。</p><p>Ingress Controller 通常会运行在 Kubernetes 集群中,作为一组 Deployment 和 Service 的形式部署。</p><p>常见的 Ingress Controller 包括:</p><ol><li>Nginx Ingress Controller 是由 Kubernetes 社区维护的另一个 Ingress Controller，它也是使用 Nginx 作为反向代理实现的，可以支持 HTTP 和 HTTPS 等协议，支持负载均衡、路由、HTTPS 证书管理等功能。</li><li>Ingress Nginx Controller 是官方维护的一个 Ingress Controller，它是使用 Nginx 作为反向代理实现的，可以支持 HTTP 和 HTTPS 等协议，支持负载均衡、路由、HTTPS 证书管理等功能。</li><li>Traefik Ingress Controller: 基于Go 语言开发的 Ingress Controller，支持多种路由匹配方式和多种后端服务发现方式。 <ol><li><strong>Traefik Ingress Controller: 标准实现 支持 官方 Ingress 路由规则 注意：这种方式使用繁琐！</strong></li><li><strong>Traefik Route CRD(customer resuource definition)自定义资源 注意：使用这种方式简单，自定义资源方式定义路由规则。</strong></li></ol></li><li>Istio Ingress Controller: 基于 Istio Service Mesh 实现的 Ingress Controller，提供了更丰富的负载均衡、流量控制和安全功能。</li><li>Kong Ingress Controller: 使用 Kong 作为反向代理实现 Ingress 功能，支持 API 管理和 Gateway 功能。</li></ol><h3 id="_4-使用-traefik-ingress-crd-方式" tabindex="-1"><a class="header-anchor" href="#_4-使用-traefik-ingress-crd-方式" aria-hidden="true">#</a> 4 使用 Traefik Ingress CRD 方式</h3><p>官方网站: https://doc.traefik.io/traefik/</p><p>具体参考: https://doc.traefik.io/traefik/user-guides/crd-acme/</p><h4 id="_1-pod-无法访问-service-解决方案" tabindex="-1"><a class="header-anchor" href="#_1-pod-无法访问-service-解决方案" aria-hidden="true">#</a> 1 pod 无法访问 Service 解决方案</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ kubectl edit cm kube-proxy <span class="token parameter variable">-n</span> kube-system
ipvs:
excludeCIDRs: null
minSyncPeriod: 0s
scheduler: <span class="token string">&quot;&quot;</span>
strictARP: <span class="token boolean">false</span>
syncPeriod: 0s
tcpFinTimeout: 0s
tcpTimeout: 0s
udpTimeout: 0s
kind: KubeProxyConfiguration
metricsBindAddress: <span class="token string">&quot;&quot;</span>
mode: <span class="token string">&quot;ipvs&quot;</span>  <span class="token comment"># 这里默认为空，填写ipvs保存</span>
 
$ <span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack
modprobe -- br_netfilter
EOF</span>

<span class="token function">chmod</span> <span class="token number">755</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
<span class="token function">bash</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
lsmod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> ip_vs <span class="token parameter variable">-e</span> nf_conntrack_ipv4

kubectl get pod <span class="token parameter variable">-n</span> kube-system <span class="token operator">|</span> <span class="token punctuation">\\</span>
<span class="token function">grep</span> kube-proxy <span class="token operator">|</span> <span class="token punctuation">\\</span>
<span class="token function">awk</span> <span class="token string">&#39;{system(&quot;kubectl delete pod &quot;$1&quot; -n kube-systen&quot;)}&#39;</span>
</code></pre></div><h2 id="第九章-命名空间" tabindex="-1"><a class="header-anchor" href="#第九章-命名空间" aria-hidden="true">#</a> 第九章 命名空间</h2><ul><li><p>命名空间 以及 作用</p></li><li><p>命名空间基本操作</p></li></ul><h3 id="_1-命名空间" tabindex="-1"><a class="header-anchor" href="#_1-命名空间" aria-hidden="true">#</a> 1 命名空间</h3><p>Kubernetes 中命名空间 (Namespace) 是用来隔离 Kubernetes 集群内的不同资源对象的一种方式。每个 Kubernetes 对象都必须被分配到一个命名空间中，而且默认情况下，一个对象只能被同一命名空间内的其他对象访问。Kubernetes 可以帮助用户在同一集群内部部署多个独立的应用程序，每个应用程序都在自己的命名空间内运行。</p><h3 id="_2-基本操作" tabindex="-1"><a class="header-anchor" href="#_2-基本操作" aria-hidden="true">#</a> 2 基本操作</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建命名空间</span>
kubectl create namespace<span class="token operator">|</span>ns testapp
<span class="token comment"># 部署应用到指定的命名空间</span>
kubectl apply <span class="token parameter variable">-f</span> app.yml <span class="token parameter variable">--namespace</span> testapp
<span class="token comment"># 查询</span>
kubectl get pod <span class="token parameter variable">--namespace</span> kube-system
</code></pre></div>`,158),M={href:"https://github.com/ahmetb/kubectx/",target:"_blank",rel:"noopener noreferrer"},T=t(`<div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出所有命名空间</span>
kubens
<span class="token comment"># 切换命名空间</span>
kubens kube-system
<span class="token comment"># 回到上个命名空间</span>
kubens -
</code></pre></div><h3 id="_3-命名空间说明" tabindex="-1"><a class="header-anchor" href="#_3-命名空间说明" aria-hidden="true">#</a> 3 命名空间说明</h3><p>Kubernetes 中的一些资源对象是可以跨命名空间使用的，例如 Node、PersistentVolume 和 StorageClass 等。这些资源对象不受命名空间的约束，可以被集群内的任何其他命名空间中的对象访问。</p><p>而另一些资源对象是受到命名空间的限制的，例如 Pod、Service、ReplicaSet、Deployment、ConfigMap、Secret 等。这些资源对象只能被同一命名空间中的其他对象访问。如果需要在多个命名空间之间共享资源，需要创建相应的资源对象的拷贝或者引用。</p><p>下面是一些常见的可以跨命名空间的资源对象：</p><ul><li><code>Node</code></li><li><code>Namespace</code></li><li><code>StorageClass</code></li><li><code>ClusterRole</code></li></ul><p>下面是一些不能跨命名空间的资源对象：</p><ul><li><code>ClusterRoleBinding</code></li><li><code>CustomResourceDefinition</code></li><li><code>Pod</code></li><li><code>ReplicaSet</code></li><li><code>Deployment</code></li><li><code>Service</code></li><li><code>ConfigMap</code></li><li><code>Secret</code></li><li><code>Ingress</code></li><li><code>PersistentVolume</code></li><li><code>PersistentVolumeClaim</code></li><li><code>Role</code></li><li><code>RoleBinding</code></li><li><code>ServiceAccount</code></li></ul><h2 id="第十章-helm" tabindex="-1"><a class="header-anchor" href="#第十章-helm" aria-hidden="true">#</a> 第十章 Helm</h2><ul><li>什么是 Helm</li><li>安装 Helm</li><li>重要概念</li><li>使用 Helm</li></ul><h3 id="_1-简介-2" tabindex="-1"><a class="header-anchor" href="#_1-简介-2" aria-hidden="true">#</a> 1 简介</h3><blockquote><p>官网地址: https://helm.sh/zh/</p></blockquote><p>Helm 是一个 Kubernetes 应用程序包管理工具，它允许你轻松管理和部署 Kubernetes 应用程序。Helm 通过使用称为 Charts 的预定义模板来简化 Kubernetes 应用程序的部署和管理。Chart 包含了一组 Kubernetes 对象定义，可以描述一个应用程序的完整部署和资源需求，包括 Deployment、Service、ConfigMap、Secret 等。使用 Helm，你可以轻松地安装、升级、卸载和回滚 Kubernetes 应用程序。</p><p>同时，Helm 还提供了一些便捷的功能，如依赖管理、全局变量、条件渲染等，可以帮助你更好地管理应用程序的部署。Helm 有两个主要的组件：Helm 客户端 (helm) 和 Helm 服务器 (Tiller)。Helm 客户端可以在本地运行，而 Tiller 则运行在 Kubernetes 集群中，并负责将 Charts 转换为 Kubernetes 对象。</p><h3 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2 安装</h3><p>下载地址：https://github.com/helm/helm/releases</p>`,16),E={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},z={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},U=t("<li><p>解压(<code>tar -zxvf helm-v3.0.0-linux-amd64.tar.gz</code>)</p></li><li><p>在解压目录中找到 <code>helm</code> 程序，移动到需要的目录中(<code>mv linux-amd64/helm /usr/local/bin/helm</code>）</p></li><li><p>添加仓库：helm repo add bitnami https://charts.bitnami.com/bitnami</p></li><li><p>验证安装：<code>helm help</code>.</p></li>",4),L=n("h3",{id:"_3-重要概念",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3-重要概念","aria-hidden":"true"},"#"),a(" 3 重要概念")],-1),F=n("li",null,[n("strong",null,"Chart"),a(" 代表着 Helm 包。它包含在 Kubernetes 集群内部运行应用程序，工具或服务所需的所有资源定义。你可以把它看作是 Homebrew formula，Apt dpkg 或 Yum RPM 在 Kubernetes 中的等价物。")],-1),O=n("strong",null,"Repository",-1),G={href:"https://www.cpan.org/",target:"_blank",rel:"noopener noreferrer"},H={href:"https://src.fedoraproject.org/",target:"_blank",rel:"noopener noreferrer"},J=n("li",null,[n("strong",null,"Release"),a(" 是运行在 Kubernetes 集群中的 chart 的实例。一个 chart 通常可以在同一个集群中安装多次。每一次安装都会创建一个新的 release。以 MysQL chart 为例，如果你想在你的集群中运行两个数据库，你可以安装该 chart 两次。每一个数据库都会拥有它自己的 release 和 release name。")],-1),B=n("h3",{id:"_4-使用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_4-使用","aria-hidden":"true"},"#"),a(" 4 使用")],-1),W=n("h4",{id:"_4-1-搜索-charts",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_4-1-搜索-charts","aria-hidden":"true"},"#"),a(" 4.1 搜索 charts")],-1),j=n("p",null,"Helm 自带一个强大的搜索命令，可以用来从两种来源中进行搜索：",-1),Y=n("code",null,"helm search hub",-1),Q={href:"https://artifacthub.io/",target:"_blank",rel:"noopener noreferrer"},$=n("li",null,[n("code",null,"helm search repo"),a(" 从你添加（使用 "),n("code",null,"helm repo add"),a("）到本地 helm 客户端中的仓库中进行查找。该命令基于本地数据进行搜索，无需连接互联网。")],-1),X=t(`<h4 id="_4-2-安装" tabindex="-1"><a class="header-anchor" href="#_4-2-安装" aria-hidden="true">#</a> 4.2 安装</h4><p>使用 <code>helm install</code> 命令来安装一个新的 helm 包。最简单的使用方法只需要传入两个参数：你命名的release名字和你想安装的chart的名称。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ helm <span class="token function">install</span> nginx bitnami/nginx
</code></pre></div><blockquote><p>注意：安装 chart 时创建了一个新的 release 对象。上述发布被命名为 <code>nginx</code>。(如果想让 Helm 生成一个名称，删除发布名称并使用 <code>--generate-name</code>。)</p></blockquote><p>helm 安装顺序: https://helm.sh/zh/docs/intro/using_helm/</p><hr><h4 id="_4-3-查看列表" tabindex="-1"><a class="header-anchor" href="#_4-3-查看列表" aria-hidden="true">#</a> 4.3 查看列表</h4><p>你可以通过 <code>helm list</code> 命令看到当前部署的所有 release:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>helm list
</code></pre></div><h4 id="_4-4-查看状态" tabindex="-1"><a class="header-anchor" href="#_4-4-查看状态" aria-hidden="true">#</a> 4.4 查看状态</h4><p>你可以使用 <code>helm status</code> 来追踪 release 的状态，或是重新读取配置信息:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>helm status nginx
</code></pre></div><h4 id="_4-5-卸载" tabindex="-1"><a class="header-anchor" href="#_4-5-卸载" aria-hidden="true">#</a> 4.5 卸载</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>helm uninstall nginx
</code></pre></div><p><strong>5 安装自定义 Chart</strong></p><p>上述安装方式只会使用 chart 的默认配置选项。很多时候，我们需要自定义 chart 来指定我们想要的配置。</p><p>5.1 拉取自定义的 chart</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>helm create app
</code></pre></div><blockquote><p>注意：当前目录中会出现一个 nginx-xxx.tgz 文件这个文件就是 charts 的包。</p></blockquote><h4 id="_5-2-查看-chart-目录结构" tabindex="-1"><a class="header-anchor" href="#_5-2-查看-chart-目录结构" aria-hidden="true">#</a> 5.2 查看 chart 目录结构</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>app/
  Chart.yaml
  values.yaml
  charts/
  templates/
  <span class="token punctuation">..</span>.
</code></pre></div><ul><li><code>templates/</code> 目录包括了模板文件。当 Helm 评估 chart 时，会通过模板渲染引擎将所有文件发送到 <code>templates/</code> 目录中。然后收集模板的结果并发送给 Kubernetes。</li><li><code>values.yaml</code> 文件也导入到了模板。这个文件包含了 chart 的 默认值。这些值会在用户执行 <code>helm install</code> 或 <code>helm upgrade</code> 时被覆盖。</li><li><code>Chart.yaml</code> 文件包含了该 chart 的描述。你可以从模板中访问它。<code>charts/</code> 目录 可以 包含其他的 chart(称之为 子chart)。</li></ul><h4 id="_5-3-自定义模板" tabindex="-1"><a class="header-anchor" href="#_5-3-自定义模板" aria-hidden="true">#</a> 5.3 自定义模板</h4><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> mychart/templates/*
</code></pre></div><ul><li>编写 namespace.yaml</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Namespace
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre></div><ul><li>编写 deployment.yaml</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.replicas <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.image <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.imagePullPolicy <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.containerPort <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.restartPolicy <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre></div><ul><li>编写 service.yml</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.namespace <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.port <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.containerPort <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.type <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre></div><ul><li>编写 Chart.yml</li></ul><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v2
<span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">description</span><span class="token punctuation">:</span> A Helm chart for Kubernetes

<span class="token comment"># A chart can be either an &#39;application&#39; or a &#39;library&#39; chart.</span>
<span class="token comment">#</span>
<span class="token comment"># Application charts are a collection of templates that can be packaged into versioned archives</span>
<span class="token comment"># to be deployed.</span>
<span class="token comment">#</span>
<span class="token comment"># Library charts provide useful utilities or functions for the chart developer. They&#39;re included as</span>
<span class="token comment"># a dependency of application charts to inject those utilities and functions into the rendering</span>
<span class="token comment"># pipeline. Library charts do not define any templates and therefore cannot be deployed.</span>
<span class="token key atrule">type</span><span class="token punctuation">:</span> application

<span class="token comment"># This is the chart version. This version number should be incremented each time you make changes</span>
<span class="token comment"># to the chart and its templates, including the app version.</span>
<span class="token comment"># Versions are expected to follow Semantic Versioning (https://semver.org/)</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> 0.1.0

<span class="token comment"># This is the version number of the application being deployed. This version number should be</span>
<span class="token comment"># incremented each time you make changes to the application. Versions are not expected to</span>
<span class="token comment"># follow Semantic Versioning. They should reflect the version the application is using.</span>
<span class="token comment"># It is recommended to use it with quotes.</span>
<span class="token key atrule">appVersion</span><span class="token punctuation">:</span> <span class="token string">&quot;1.16.0&quot;</span>
</code></pre></div><p>5.4 验证是否存在错误</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>helm lint app
</code></pre></div><p>5.5 打包自定义 chart</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>helm package app
</code></pre></div><p>5.6 安装 chart</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> app myapp-1.tgz
</code></pre></div>`,38);function Z(nn,an){const s=o("ExternalLinkIcon");return c(),l("div",null,[n("h1",k,[i,a(),n("a",r,[a("Kubernetes"),e(s)])]),d,n("p",null,[m,a(" 这个名字源于希腊语，意为 "),y,a(" 或 "),h,a(" 。k8s 这个缩写是因为 k 和 s 之间有八个字符的关系。 Google 在 2014 年开源了 Kubernetes 项目。 Kubernetes 建立在 "),n("a",g,[a("Google 大规模运行生产工作负载十几年经验"),e(s)]),a("的基础上， 结合了社区中最优秀的想法和实践。")]),b,n("ul",null,[v,f,n("li",null,[n("p",null,[a("不提供应用程序级别的服务作为内置服务，例如中间件（例如消息中间件）、 数据处理框架（例如 Spark）、数据库（例如 MySQL）、缓存、集群存储系统 （例如 Ceph）。这样的组件可以在 Kubernetes 上运行，并且/或者可以由运行在 Kubernetes 上的应用程序通过可移植机制（例如"),n("a",P,[a("开放服务代理"),e(s)]),a("）来访问。")])]),x,q,_,S]),C,n("ul",null,[V,w,n("li",null,[a("StatefulSet 当前需要"),n("a",I,[a("无头服务"),e(s)]),a("来负责 Pod 的网络标识。你需要负责创建此服务。")]),N,K]),D,n("p",null,[a("完成的 Job 通常不需要留存在系统中。在系统中一直保留它们会给 API 服务器带来额外的压力。 如果 Job 由某种更高级别的控制器来管理，例如 "),n("a",R,[a("CronJob"),e(s)]),a("， 则 Job 可以被 CronJob 基于特定的根据容量裁定的清理策略清理掉。")]),A,n("p",null,[a("可以用 "),n("a",M,[a("kubens"),e(s)]),a(" 快速切换 namespace")]),T,n("blockquote",null,[n("p",null,[a("每个Helm "),n("a",E,[a("版本"),e(s)]),a("都提供了各种操作系统的二进制版本，这些版本可以手动下载和安装。")])]),n("ol",null,[n("li",null,[n("p",null,[a("下载 "),n("a",z,[a("需要的版本"),e(s)])])]),U]),L,n("ul",null,[F,n("li",null,[O,a(" (仓库) 是用来存放和共享 charts 的地方。它就像 Perl 的 "),n("a",G,[a("CPAN 档案库网络"),e(s)]),a(" 或是 Fedora 的 "),n("a",H,[a("软件包仓库"),e(s)]),a("，只不过它是供 Kubernetes 包所使用的。")]),J]),B,W,j,n("ul",null,[n("li",null,[Y,a(" 从 "),n("a",Q,[a("Artifact Hub"),e(s)]),a(" 中查找并列出 helm charts。 Artifact Hub中存放了大量不同的仓库。")]),$]),X])}const en=p(u,[["render",Z],["__file","index.html.vue"]]);export{en as default};
