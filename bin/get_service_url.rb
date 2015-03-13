#!/usr/bin/env ruby

require 'logger'

module Logging
  def logger
    Logging.logger
  end

  def self.logger
    @logger ||= Logger.new(STDOUT)
  end
end

module VCAPService
	attr_accessor :data

	class Read
		class << self
			include Logging
			
			def findServiceCredentials(environment)
				#logger.info "finding service credentials"				
				#logger.debug @data

				@data = ENV[environment] || '{}'
				name,url  = @data.scan(/"(url|name)":"([^,\}]+)"/)
				
				if(name!=nil && url!=nil)
					puts 'export ' + name[1]+'="' + url[1] + '"'
				end
				
			end
    	end
	end
end

VCAPService::Read.findServiceCredentials('VCAP_SERVICES')

ENV['VCAP_SERVICES'].scan(/"(url|name)":"([^,\}]+)"/)
